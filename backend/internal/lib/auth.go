package lib

import (
	"log"
	"os"

	"github.com/magiclabs/magic-admin-go"
	"github.com/magiclabs/magic-admin-go/client"
	"github.com/magiclabs/magic-admin-go/token"
)

var authClient *client.API

func InitAuth() {
	authClient = client.New(os.Getenv("MAGIC_SECRET_KEY"), magic.NewDefaultClient())
	log.Println("Auth client successfully created")
}

func GetUser(issuer string) (*magic.UserInfo, error) {
	return authClient.User.GetMetadataByIssuer(issuer)
}

func ValidateToken(didToken string) (*token.Token, error) {
	tk, err := token.NewToken(didToken)
	if err != nil {
		return nil, err
	}
	if err := tk.Validate(); err != nil {
		return nil, err
	}
	return tk, nil
}
