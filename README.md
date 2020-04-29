# Djello

A task manager similar to Trello built on the MERN stack. I'm still adding features and am in the process of refactoring/reorganizing the code base.

https://intense-woodland-98650.herokuapp.com/

**App Features:**

- User sign-in/out powered by Passport (local strategy)

- Create and delete boards and lists with draggable/droppable cards (react-beautiful-dnd)

- Modals for each card with the following features: - Editable title and description fields - Member adding capability - Checklists - Image attachments - Activity feed

**Still to Come:**

- Document attachments
- Password confirmation on user registration.

**Issues to address:**

- Dry up routes by encapsulating repeated code in functions
- Break up routes file into separate files for each resource
- Clean up comments/superfluous code
- Enhance error handling on back end
