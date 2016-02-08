#TODO

 - [X] Create Action Creators
 
 - [X] Create Character and NPC Phoenix Models

 - [ ] Hook up Thunk Middleware for Fetching the above

 - [ ] Create Game and store state GenServer/Agent
 
 - [ ] Create Channels and Wireup to Redux for syncing Game state

 - [ ] Add Client Side Routing

 - [ ] Implment Selecting a Character / Player vs GM

# Dux in the Channel
## Using Elixir, Phoenix, React and Redux together

  - Title Duck Slide

### Hello o/

  - Where I Work / Mention Training

  - About Me

### Intro to Elixir

  - History 

  - Functional

  - Immutability

  - Pattern Matching

  - Pipes

  - Erlang Interop

  - Processes
  
  - Stateful Servers

  - Supervision

  - Tooling 

### Phoenix

 - Series of Plugs

### Introduction to React

  - Components / JSX 
  
### The Problem of State

  - Where do you put things between requests

### Enter Redux

 - Three Philosophies

### The Client just another Node in the Distributed System
 - Actions
   Tell What happened in your Application

 - Reducer Pattern

   Tell How the state will changed based on what happened.

   `(previousState, action) => newState`

   "It’s a good idea to think of its shape before writing any code. What’s the minimal representation of your app’s state as an object?" 

   - Compare to GenServer

 - The Store

 - Testing

 - ? Functional Reactivity

### Enter Channels

 - Pushing data to the client
 
 - Stateful Server

### Agents and GenServers
    
 - Modeling our Game

