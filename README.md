# Separation of concerns

## Why separate concerns?

* easier to write
* easier to maintain
* easier to test
* easier to reuse

## Thinking about concerns

When we separate concerns we create distinct layers in our architecture.

![Layers](https://alchemycodelab.s3.us-west-2.amazonaws.com/Layers.png)

Each of these layers expose an interface (API) through which the
layers can communicate with each other.

### Interface Example

An interface that many of us have experience with is a T.V. control.
A T.V. control is an interface that we can use to interact with a T.V.

## Layered Architecture

Layered architecture gives us a place for all of our code taking away some of the organizational
cognitive load.

It makes writing code easier because each piece of code has limited responsibility. As a developer
we only need to keep this limited responsibility in mind while developing.

Let's start trying to find layers in the systems that we build and
clearly define these layers in the code that we write.

## Back-end Layers

### Model (lib/models)

Models manage our data. They are responsible for the shape of our data 
and retrieving that data from a data store.

The model will then expose an interface to the rest of the application.
Any other file doesn't need to concern itself with how the data is
managed.

### Controller (lib/controllers)

Controllers take incoming input and forward the information to the
appropriate model or service

### Service (lib/services)

Services contain our domain logic. They contain the code that makes
our application unique.

Services are not responsible for talking to the database, and they are
not responsible for handling incoming input. They are responsible for
solving real problems

### utils (lib/utils)

Utility functions to make life easier.
