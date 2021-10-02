package user

import (
	"time"

	"github.com/graphql-go/graphql"
)

var userType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "User",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.Int,
			},
			"email": &graphql.Field{
				Type: graphql.String,
			},
			"user_name": &graphql.Field{
				Type: graphql.String,
			},
			"display_name": &graphql.Field{
				Type: graphql.String,
			},
			"photo_url": &graphql.Field{
				Type: graphql.String,
			},
			"created_at": &graphql.Field{
				Type: graphql.DateTime,
			},
			"updated_at": &graphql.Field{
				Type: graphql.DateTime,
			},
		},
	},
)

var UserQueryType = &graphql.Field{
	Type:        userType,
	Description: "Get user",
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		var result interface{}
		id, ok := p.Args["id"].(int)
		if ok {
			result = &User{
				ID:          id,
				Email:       "juntae@gmail.com",
				DisplayName: "juntae",
				CreatedAt:   time.Now(),
				UpdatedAt:   time.Now(),
			}
		}
		return result, nil
	},
}

var UserMutationType = graphql.Fields{
	"createUser": &graphql.Field{
		Type:        userType,
		Description: "user mutation",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			var result interface{}
			// somthing ...
			return result, nil
		},
	},
}
