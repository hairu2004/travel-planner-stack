import http.client

conn = http.client.HTTPSConnection("booking-com.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "5d440e65c8msh252d1d0ab6f3bf7p117ac4jsn066baf5b2de9",
    'x-rapidapi-host': "booking-com.p.rapidapi.com"
}

conn.request("GET", "/v1/car-rental/important-info?pick_up_datetime=2025-01-18%2013%3A00%3A00&driver_age=30&drop_off_datetime=2025-01-19%2013%3A00%3A00&from_country=it&locale=en-gb&pick_up_location_id=4123205&drop_off_location_id=4123205&vehicle_id=663317713", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))