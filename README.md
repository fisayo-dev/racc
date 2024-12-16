# Racc - Online voting platform

Racc is a free online voting platform that aims to connect **vote creators** and **voters**. It is built with ***React JS***.

<!-- Strikethrough -->

~~ddsdklksl~~

## About

## Tech Stacks

- JavaScript
- React Js
- Appwrite
- Git and Github
- Shadcn
- Tailwind Css
- Vercel

## Project Link

-----------------------

- [project](https://raccvoting.vercel.app)
- [project](https://raccvoting.vercel.app "project")
- <https://raccvoting.vercel.app>

## Image

![img](https://jsmasterypro.com/img.png)

### Image serving as link

[![img](https://jsmasterypro.com/img.png)](https://jsmasterypro.com/img.png)

## Code

### Inline code

This `code` is an **inline** code and it has _`backticks`_ around it.

### Block Code

```
    const fetchUserVotes = async () => {
    const results = await db.votes.list([Query.orderDesc("$createdAt")]);
    const votes = results.documents;
    const user_votes = votes.filter((vote) => vote.creator_id === userId);
    setUserVotes(user_votes);
  };

```

### Block code with highlighting

```python
    name = 'Fisayo'
    def returnName (name):
        return f'Your name is {name}'
```
```javascript
    const fetchUserVotes = async () => {
    const results = await db.votes.list([Query.orderDesc("$createdAt")]);
    const votes = results.documents;
    const user_votes = votes.filter((vote) => vote.creator_id === userId);
    setUserVotes(user_votes);
  };
```

## Tables
 Name     | Job                      | Salary 
 -------- |:----------------------  | ------:
 Fisayo   | Web Developer            | $5000  
 Samuel   | Product Designer         | $3400  
 Henry    | Game Developer           | $3000  
 Emmanuel | Full-Stack Web Developer | $4000  

## Task Lists
- [_] Wash the dishes
- [_] Sweep the house
- [X] Create Racc client-side validation
- [X] Implement Picture Upload
