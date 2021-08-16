# API REST Vehiculos
API REST Backend en NodeJS y mongoDB con operaciones CRUD

## Link a heroku

## Modulos utilizados
- express
- mongoose

## [Requerimientos](https://github.com/frann11/teste-fullstack)
- Realizar una API JSON REST que utilice todos los metodos (GET,POST,PUT,PATCH,DELETE)

## Endpoints
```
GET /api/vehiculos
```
Devuelve todos los vehiculos
<br>

```
   GET /api/vehiculos/buscar?{querys}
```
- Busca vehiculos segun las querys introducidas (nombre, anio, vendido= true o false) <br>
ejemplo.
```
   GET /api/vehiculos/{id}
```
```
   GET /api/vehiculos/buscar?marca=volkswagen&anio=2010
```
- Devuelve detalles del vehiculo consultado por id
```
   POST /api/vehiculos/
```
- crea un nuevo vehiculo, requiere los siguientes parametros:
- opcionales
```
   PUT /api/vehiculos/{id}
```
- actualiza todos los datos del vehiculo correspondiente al id indicado, requiere los siguientes parametros obligatorios en el body
```
   PATCH /api/vehiculos/{id}
```
- actualiza parcialmente los datos indicados del vehiculo correspondiente al id
```
   DELETE /api/vehiculos/{id}
```
- borra el vehiculo correspondiente al id
