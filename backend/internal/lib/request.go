package lib

import (
	"errors"
	"net/http"
	"strings"
)

var BEARER_SCHEMA = "Bearer"

func SetBearerSchema(schema string) {
	BEARER_SCHEMA = schema
}

func GetAuthToken(r *http.Request) (string, error) {
	didToken := r.Header.Get("Authorization")

	if !strings.HasPrefix(didToken, BEARER_SCHEMA) || len(didToken) < len(BEARER_SCHEMA)+1 {
		return "", errors.New("Bearer token is required")
	}

	didToken = didToken[len(BEARER_SCHEMA)+1:]

	if didToken == "" {
		return "", errors.New("DID token is required")
	}

	return didToken, nil
}
