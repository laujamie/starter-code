package main

import (
	"log"
	"net/http"
	"net/url"
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
	ENV := getEnv("GO_ENV", "development")

	if ENV == "development" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	lib.InitAuth()
	db.Init()

	e := echo.New()
	e.Debug = ENV == "development"

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.Timeout())

	// Set CORS origins based on environment
	var allowOrigins []string
	if e.Debug {
		allowOrigins = []string{"https://*", "http://*"}
	} else {
		clientUrl := getEnv("CLIENT_URL", "")
		tmpUrl, err := url.Parse(clientUrl)
		if err != nil {
			panic("No client URL was provided.")
		}
		tmpUrl.Scheme = "https" // don't allow http outside dev
		clientUrl = tmpUrl.String()
		allowOrigins = []string{clientUrl}
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: allowOrigins,
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
