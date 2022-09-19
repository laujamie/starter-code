package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/laujamie/starter-code/internal/db"
	"github.com/laujamie/starter-code/internal/handlers"
	"github.com/laujamie/starter-code/internal/lib"
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	ENV := getEnv("GO_ENV", "development")

	lib.InitAuth()
	db.Init()

	e := echo.New()
	e.Debug = ENV == "development"

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.Timeout())

	// CORS middleware when in dev environment
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"https://*", "http://*"},
		AllowHeaders: []string{
			echo.HeaderAuthorization,
			echo.HeaderAccept,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderXCSRFToken,
		},
		AllowMethods: []string{
			echo.GET,
			echo.PUT,
			echo.POST,
			echo.DELETE,
		},
	}))

	handlers.InitAuthRoutes(e)

	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"message": "hello world",
		})
	})

	e.Logger.Fatal(e.Start("0.0.0.0:5001"))
}
