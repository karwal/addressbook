# PWC Address Book

# Design / Architecture
I have chosen Spring Boot to create this application. The reason for choosing Spring Boot is its convention over configuration approach and ability to create standalone applications. 
Project structure was generated using Spring Initializr. React has been used for front end.

# Tech-Stack Used to build application:

1. Spring boot embedded Tomcat Server
2. In-Memory h2 Database (but can be used with any jdbc compliant database)
3. Spring Rest
4. Spring Security
5. Spring Data Rest
6. Jackson : Java to Json mapping 
7. Unit Testing Persistence : JPA provided by Hibernate 
8. JUnit : Unit Test Framework 
9. Mockito : Mocking framework 
10. Maven : Build integration
11. Postman/Curl : testing Rest Services.
12. React

**Note** My primary skillset lies around backend services. Though I have done some frontend development using Google GWT and Adobe Flex in the past, but I am not upto date with modern front end technologies like React/Angular etc. The React used in this project is what I learned and applied in two days. I have created a front end for the sake com completeness.

# Security Considerations / Assumptions:
1. Full OAuth based authentication/authorization was not implemented as it was out of scope for this excercise.	
2. REST services are secured using access token, which is hard coded for this application. But in a real world application it will be generated using OAuth etc.
3. Security services are provided by non-invasive http interceptors.
4. Only backend has been secured. I considered front end security out of scope for this exercise.

# How to run this application
* Clone the git repo using following command

```git clone https://github.com/karwal/addressbook.git```

This will create a folder addressbook in your current working directory.
* Execute command:

``` cd addressbook ```
* Compile code using following command

``` mvn clean install ```
* Run the application using following command

``` java -jar ./target/addressbook-0.0.1-SNAPSHOT.jar```
* Now application is started.

* Front end is available at: http://localhost:8080/

**Note** My primary skillset lies around backend services. Though I have done some frontend development using Google GWT and Adobe Flex in the past, but I am not upto date with modern front end technologies like React/Angular etc. The React used in this project is what I learned and applied in two days. I have created a front end for the sake com completeness.

- Database is available at:
	- http://localhost:8080/h2_console
	- Username: sa
	- Password: <empty>
	- Database: ./h2/addressbookdb


# Using application
* Create few Address Book using any Rest client (I have used Postman/Curl)
	* endpoint URL: http://localhost:8080/vi/api/pwc/addressbook/create
	* http method= POST
	* add following two http headers:
	* key=Authorization value=abc123
	* key=Content-Type  value=application/json
```curl -d '{"name": "Outlook"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/api/pwc/addressbook/create```
```curl -d '{"name": "Google"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/api/pwc/addressbook/create```
```curl -d '{"name": "Yahoo"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/api/pwc/addressbook/create```


* Run the following command to view address books you created
	* endpoint URL: http://localhost:8080/vi/pwc/api/addressbook
	* http method=GET
	* add following http header:
 	* key=Authorization value=abc123
	
```curl -H "Content-Type: application/json" -X POST http://localhost:8080/vi/pwc/api/addressbook```


* Run the following endpoint create a contact. Remember to update the addressbook id to the id of an addressbook created in previous step.
	* endpoint URL: http://localhost:8080/vi/pwc/api/contact/create
	* http method=GET
	* add following http header:
 	* key=Authorization value=abc123

```
curl -d '{"addressBookId" : "1", ""contactName": "Jagdeep1", "contactPhoneNumber" : "0424144966"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/pwc/api/contact/create
curl -d '{"addressBookId" : "2", ""contactName": "Jagdeep1", "contactPhoneNumber" : "0424144967"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/pwc/api/contact/create
curl -d '{"addressBookId" : "3", ""contactName": "Jagdeep1", "contactPhoneNumber" : "0424144968"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/pwc/api/contact/create
curl -d '{"addressBookId" : "1", ""contactName": "Jagdeep2", "contactPhoneNumber" : "0424144969"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/pwc/api/contact/create
curl -d '{"addressBookId" : "2", ""contactName": "Jagdeep3", "contactPhoneNumber" : "0424144970"}' -H "Content-Type: application/json" -X POST http://localhost:8080/vi/pwc/api/contact/create
```

* Run the following endpoint to get Unique contacts in all address books
	* endpoint URL: http://localhost:8080/v1/api/pwc/contact?unique=true
	* http method=GET
	* add following http header:
 	* key=Authorization value=abc123
	
```
curl  -H "Content-Type: application/json" -H  "Authorization: abc123"   -X GET http://localhost:8080/v1/api/pwc/contact?unique=true
```

# Unit Testing
JUnit coverage is provided for controller classes and interceptor class(AuthenticationInterceptor.java) only. 
There is no JUnit coverage for repository class methods as repository is just an Inteface and implementation is provided by JPA.

# References
* https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm
* https://spring.io/guides/tutorials/react-and-spring-data-rest/


## Author
* **Jagdeep Singh**
