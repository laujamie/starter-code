package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/magiclabs/magic-admin-go/token"

	rendPkg "github.com/unrolled/render"
)

const BEARER_SCHEMA = "Bearer"

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := chi.NewRouter()
	render := rendPkg.New()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(middleware.Timeout(60 * time.Second))

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"X-PINGOTHER", "Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	}))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Post("/api/login", func(w http.ResponseWriter, r *http.Request) {
		didToken := r.Header.Get("Authorization")

		if !strings.HasPrefix(didToken, BEARER_SCHEMA) {
			render.JSON(w,
				http.StatusForbidden,
				map[string]string{"message": "Bearer token is required"},
			)
			return
		}

		didToken = didToken[len(BEARER_SCHEMA)+1:]

		if didToken == "" {
			render.JSON(w,
				http.StatusForbidden,
				map[string]string{"message": "DID token is required"},
			)
			return
		}

		tk, err := token.NewToken(didToken)
		if err != nil {
			render.JSON(w,
				http.StatusForbidden,
				map[string]string{
					"message": fmt.Sprintf("Malformed DID token error: %s", err.Error()),
				},
			)
			return
		}
		if err := tk.Validate(); err != nil {
			render.JSON(w, http.StatusForbidden, map[string]string{"message": err.Error()})
			return
		}

		render.JSON(w, http.StatusOK, map[string]string{"message": "Validation successful"})
	})

	http.ListenAndServe(":5001", r)
}
