# CREATE A PROGRAM
 ```
curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{
	"productId": "id-de-produto",
	"value": 1900,
	"percentage": 2500,
	"startDate": "2022-07-27T00:00:00.000Z",
	"endDate": "2030-07-27T00:00:00.000Z",
	"status": true
}' \
 'https://opencashback.herokuapp.com/opencashback'
```


# FIND CASHBACK PRICE

```
 curl -i -X GET \
 'https://opencashback.herokuapp.com/opencashback/id-de-produto/15000'
```


# FIND ALL PROGRAMS
```
 curl -i -X GET \
 'https://opencashback.herokuapp.com/opencashback/'
```


# FIND ONE PROGRAM
```
curl -i -X GET \
 'https://opencashback.herokuapp.com/opencashback/62e3633e1fab32f16eb39858'
```


# UPDATE ONE PROGRAM
```
curl -i -X PATCH \
   -H "Content-Type:application/json" \
   -d \
'{
	"percentage": 2730
}' \
 'https://opencashback.herokuapp.com/opencashback/62e3633e1fab32f16eb39858'
```


# REMOVE A PROGRAM
```
curl -i -X DELETE \
 'https://opencashback.herokuapp.com/opencashback/62e3633e1fab32f16eb39858'
```