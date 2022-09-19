package db

import (
	"errors"
	"net/mail"

	"github.com/laujamie/starter-code/internal/model"
)

func GetUser(email string) (*model.User, error) {
	if _, err := mail.ParseAddress(email); err != nil {
		return nil, err
	}
	user := &model.User{}
	if err := db.Where("email = ?", email).Find(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func AddUser(email string) error {
	if _, err := mail.ParseAddress(email); err != nil {
		return err
	}
	user := &model.User{Email: email}
	if err := db.Create(user).Error; err != nil {
		return err
	}
	return nil
}

func UpdateUserEmail(oldEmail string, updateEmail string) error {
	if _, err := mail.ParseAddress(updateEmail); err != nil {
		return errors.New("Invalid updated email")
	}
	if err := db.Model(&model.User{}).Where("email = ?", oldEmail).Update("email", updateEmail).Error; err != nil {
		return err
	}
	return nil
}
