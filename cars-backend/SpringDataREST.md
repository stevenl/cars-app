Spring Data REST
================

Access the RESTful web service from: http://localhost:8080/api.

### GET
```shell
curl http://localhost:8080/api/cars
```

### POST
Insert a new car record.
```shell
curl 'http://localhost:8080/api/cars' \
--header 'Content-Type: application/json' \
--data '{
  "brand":"Toyota",
  "model":"Corolla",
  "color":"silver",
  "registrationNumber":"BBA-3122",
  "modelYear":2023,
  "price":38000
}'
```

### PUT
Add an owner to the car.
```shell
curl --request PUT 'http://localhost:8080/api/cars/4/owner' \
--header 'Content-Type: text/uri-list' \
--data 'http://localhost:8080/api/owners/1'
```

### PATCH
Update the car color.
```shell
curl --request PATCH 'http://localhost:8080/api/cars/4' \
--header 'Content-Type: application/json' \
--data '{"color":"white"}'
```

### DELETE
```shell
curl --request DELETE 'http://localhost:8080/api/cars/4'
```

### Search queries
Queries provided by the repository are available at http://localhost:8080/api/cars/search.

E.g. http://localhost:8080/api/cars/search/findByBrand?brand=Toyota.
