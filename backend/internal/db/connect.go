package db

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/laujamie/starter-code/internal/model"
)

var db *gorm.DB

func Init() error {
	tmp, err := gorm.Open(postgres.Open(os.Getenv("DATABASE_URL")+"&application_name=$ starter_backend"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	db = tmp

	db.AutoMigrate(&model.User{})

	return err
}
