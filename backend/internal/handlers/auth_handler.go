package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/laujamie/starter-code/internal/db"
	"github.com/laujamie/starter-code/internal/lib"
)

func InitAuthRoutes(e *echo.Echo) {
	e.POST("/login", handleLogin)
}

func handleLogin(c echo.Context) error {
	didToken, err := lib.GetAuthToken(c.Request())
	if err != nil {
		return c.JSON(http.StatusForbidden, map[string]string{
			"message": fmt.Sprintf("DID token error: %s", err.Error()),
		})
	}

	tk, err := lib.ValidateToken(didToken)
	if err != nil {
		return c.JSON(http.StatusForbidden, map[string]string{
			"message": fmt.Sprintf("Could not validate token: %s", err),
		})
	}

	magicUser, err := lib.GetUser(tk.GetIssuer())
	if err != nil {
		log.Fatal(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": fmt.Sprintf("Could not retrieve user: %s", err),
		})
	}

	if _, err := db.GetUser(magicUser.Email); err != nil {
		if err := db.AddUser(magicUser.Email); err != nil {
			log.Fatalf("Could not retrieve user: %s", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"message": fmt.Sprintf("Could not retrieve user: %s", err),
			})
		}
		log.Printf("Successfully added user %s to DB", magicUser.Email)
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Validation successful",
	})
}
