# Front end developer test case  

## Test assignment description  
  
You've received an API access to the `Companies` and `Contracts` micro-services.   
Both of them are completely independent from each other.  
  
###You have to:

1. Create a small frontend application with access to these micro-services where user should be 
able to view all companies, see selling contracts inside with clients names included. See interface example [here](#markdown-header-example-user-interface). 
URL structure should be organized like this: 
    * / -- any 'hello world' home page with a link to the companies page
    * /companies -- page with companies and contracts list 
2. Perform a code review of the provided api access classes (they are in `services` folder) with detailed and structured result  
3. Propose an API improvement if you'll have any

###What we're expecting:

1. Don't spend more than 1 workday to solve this task
2. Demonstrate your most readable and clean code
3. Demonstrate your design skills (SOLID, KISS, DRY etc.)
4. Place code in a bitbucket private repository and send an invite to alex@demins.com

###Bonus points:

1. Add a contract edit form where user will be able to modify contracts info - contract number, signing date, end date. Make it as a form nested dialog.
2. Add any type of user authentication and/or authorization   
 
###Fast navigation:

- [Technologies you should use](#markdown-header-technologies-you-should-use)

- [Resources description](#markdown-header-resources-description)

- [API reference](#markdown-header-api-reference)

- [API examples](#markdown-header-api-examples)

## Example user interface
For example, the user interface might look like this:   
  
`  
[-] Samsung`  
  
| Contract | Client | Signed | End date |  
|----------|--------|--------|------------|  
|XXXX|Microsoft|2017-03-11|2018-03-11| |...|...|...|...|   

`[+] Microsoft`  
  
`[-] Apple`  
  
| Contract | Client | Signed | End date |  
|----------|--------|--------|------------|  
|...|...|...|...|   

## Technologies you should use  

###Development
`vue.js`, `vue router`, `ES6 with async/await`, [`vue element`](https://github.com/ElemeFE/element) as an UI library
and additional libraries if you'll need them: `vuex`, `lodash`, `moment.js`, etc... 

**DO NOT** use `JQuery` or any libraries having JQuery as a dependency

###Project organization and bundling
`vue-cli` or `laravel mix`, `webpack`

It will be perfect if you'll place your project inside docker

##Resources description  
###Company  
| Attribute | Type | Description |  
|-----------|-------| ----------- |  
|`id`|`unsigned int`|company unique identifier  
|`name`|`string`|company name  

###Contract  
| Attribute | Type | Description |  
|-----------|-------| ----------- |  
|`id`|`unsigned int`|contract unique identifier  
|`sid`|`unsigned int`|seller company ID  
|`cid`|`unsigned int`|client company ID  
|`signed_at`|`string`|contract termination date formatted as 'yyyy-mm-dd'  
|`valid_till`|`string`|contract signing date formatted as 'yyyy-mm-dd'  
  
##API Reference  
###Futures and limitations  
1. All query results containing multiple rows are always paginated   
2. Maximum page size is 5 elements  
3. Every method returns a Promise  
4. Network latency is somewhere between 100ms and 200ms  

###Usage
To use all functionality just import resource classes:
```javascript
import {Companies, Contracts} from '{relative path}/services/resources'
const companies = new Companies()
const contracts = new Contracts()
```

###Methods  
| Method | Description |  
| ------ | ------ | |`getTotal()` | returns total rows count  
|`find(id)` | finds and returns an object by its ID  
|`getBatch(field, values, page, perPage, orderBy)` | performs batch query to obtain a paginated list of the objects, filtered with desired condition. resulted array can be sorted in ascending order by specified attribute.  
|`list(page, perPage, orderBy)` | returns paginated list of the objects. resulted array can be sorted in ascending order by specified attribute |  
|`modify(object)` | modifies (replaces) object in the database |  
  
##API Examples:  
###Get total rows count:  
```javascript
const companies = new Companies()
const result = await companies.getTotal()  
```  
```  
Result:
10 
```  

###Find an object by its ID:  
```javascript
const companies = new Companies();
const result = await companies.find(1);
```  
```  
Result:
{  
  id: 1, 
  name: "Google"
}  
```

###Query objects
```javascript
const companies = new Companies()
//get first five objects. If no orderBy value provided, list will be sorted by ID in ascending order
const result1 = await companies.list(0, 5)
//get second page with three objects on each page. sort list by name in ascending order
const result2 = await companies.list(1, 3, 'name')
```
```
result1:
[
    {id: 1, name: "Google"},
    {id: 2, name: "Apple"},
    {id: 3, name: "Microsoft"},
    {id: 4, name: "Amazon"},
    {id: 5, name: "Tesla"}
]

result2:
[
    { id: 7, name: "Cisco" }, 
    { id: 1, name: "Google" }, 
    { id: 6, name: "IBM" }
]
```

###Query objects in batch request
```javascript
const companies = new Companies()
//query by id = 1 or 2 or 5. get first page with 5 items per page. sort result by name in ascending order
const result = await companies.getBatch('id', [1,2,5], 0, 5, 'name')
```
```
Result:
[
    {id: 2, name: "Apple"},
    {id: 1, name: "Google"},
    {id: 5, name: "Tesla"}
]
```