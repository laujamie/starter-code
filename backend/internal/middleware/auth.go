package middleware

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/laujamie/starter-code/internal/lib"
)

func AdminRoute(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Check if user is properly authenticated and return if not
		didToken, err := lib.GetAuthToken(c.Request())
		if err != nil {
			return c.JSON(http.StatusForbidden, map[string]string{
				"message": err.Error(),
			})
		}

		if _, err := lib.ValidateToken(didToken); err != nil {
			return c.JSON(http.StatusForbidden, map[string]string{
				"message": err.Error(),
			})
		}

		// Pass on request if user is authenticated
		return next(c)
	}
}
