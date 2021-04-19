# paw-api-doc
API document exporter for paw.cloud

## Example Documents

### User Login

login system with user.

#### Endpoint

**POST** `https://example.com/oauth2/token`

#### Request Type

`application/x-www-form-urlencoded; charset=utf-8`

#### Query Parameters

None.

#### Request Body Parameters

| Name | Type | Example | Description |
|:------:|:------:|:-----|:-----|
| client_id | string | 123456 | - |
| client_secret | string | 123456 | - |
| username | string | 123456 | - |
| password | string | 123456 | - |
| date | string | 1618822815000 | - |
| startDate | string | 0 | - |
| endDate | string | 0 | - |
| pageNo | string | 1 | - |
| pageSize | string | 20 | - |


#### Request Body Example

```json
client_id=123456&client_secret=123456&username=123456&password=123456&date=1618822815000&startDate=0&endDate=0&pageNo=1&pageSize=20
```

#### Response Body Parameters

| Name | Type | Example | Description |
|:------:|:------:|:-----|:-----|
| access_token | string | 123456 | - |
| uid | number | 123456 | - |
| refresh_token | string | 123456 | - |
| openid | number | 123456 | - |
| scope | string | user,key,room | - |
| token_type | string | Bearer | - |
| expires_in | number | 7776000 | - |


#### Response Body Example

```json
{"access_token":"123456","uid":123456,"refresh_token":"123456","openid":123456,"scope":"user,key,room","token_type":"Bearer","expires_in":7776000}
```
