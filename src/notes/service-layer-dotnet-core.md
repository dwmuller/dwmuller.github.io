---
tags:
    - dotnet
    - architecture
title: Controller/Service Layers in .NET Core
layout: note.html
---
# {{ title }}

With many code architecture patterns, e.g. Model-View-Controller, assigning
responsibilities to various proposed parts seems to engender a lot of debate.
This is certainly also true of the very basic controller/service layering common
in ASPNET core Web applications. Microsoft's own examples can be contradictory.
I am constantly debating with myself over various details that arise in this
simple layering. So I'll try to gather thoughts here.

## Why introduce a service layer?

There can be several reasons. If none of them apply, you may be better off
without the maintenance overhead incurred by service layer separation.

### Separation of programming teams

If you have separate sets of developers working on database I/O and constraint
logic versus the details of HTTP API endpoints or page generation, then these
layers make it easy for separate teams to do their work with minimal
interference.

### Automated Testing

You may find it easier to build automated tests for service layers, without
having to mock HTTP machinery.

On the other hand, if you're going to write tests for your controllers, you'll
need that machinery anyway.

## What data types do you use in the service layer API?

Data Transfer Object (DTO) classes, or model classes?

There are a lot of online articles that stress the importance of keeping your
domain model classes out of the controller layer. No plausible-sounding
justification is ever given. The domain data model in most applications seems to
me to be neither more nor less volatile than the data model presented by a Web
API.

In many apps, especially where Entity Framework is used, the model classes will
correspond closely to database schema. Using DTOs in a Web API makes sense
if there are details of the database model that are inapproprate in the Web API,
or if the representation of things in the Web API need to be different. (For
example, you may prefer to represent references to other objects using URIs in a
Web API, instead of key values.)

But should the DTOs be used to communicate with the service layer? Or is it OK
to use model classes here?

Since I don't subscribe to the notion that model objects are toxic to the
controller layer, I see no reason not to use them there. However, there are
situations where using a DTO, that is to say an alternate or partial
representation of model object, in the service layer API might be appropriate:

- Returning collections of partial objects, when the subset of properties is
  fixed. This lets the service layer optimize the database query.
    - But a query method that allows the caller to specify the output columns
      will require an entirely different, dynamic, representation of results.
- When input values contain enough properties to warrant packaging into a single
  object, but fewer than a corresponding model object.

This leads me to the following conclusion: There are DTO classes, and there are
DTO classes. Classes that serve as proxies or alternatives to model objects in
the service layer API are properly thought of as part of the service layer API.
DTO classes defined for use in HTTP traffic may be specific to HTTP controllers.

### APIs as cell membranes

A possibly useful metaphor here is molecular biology. Cell membranes prevent
most molecules from crossing, but some specific molecules are transported
directly through, in one direction or another. Other molecules may need to be
transformed in some way for transport through a membrane, and may be transformed
again on the other side, possibly back to their original form.

In software, data objects are the molecules, and layer APIs are the cell
membranes. Some molecules are just generally present on both sides of an API
(e.g. all the built-in types). Some of those may pass through the membrane, and
some may not. HTTP-specific data types will not exist inside the service layer.
Domain model objects are ubiquitous to the application and may be present
everywhere. Some specific types may be defined solely for the purpose of
transport across the service layer membrane.

### JSON Patch

JSON Patch in .NET is problematic if you are trying to keep your service layer
independent of HTTP machinery. The implementation of it is in AspNetCore, which
is not appropriate to use in the service layer in this case. Since in general
the patch has to be applied to a populated, up-to-date model object, you can't
process the patch in the controller.

But, every problem in computer science can be solved using indirection. In this
case, instead of passing a JsonPatchDocument to the service layer, pass it a
method to call which takes the model object and applies the patch. Since I take
the position that it's OK for controller code to reference model objects, this
works fine.

## Authentication and Authorization

Asp.Net Core provides a rich system for authentication and authorization.
Authentication clearly has to happen at the HTTP layer, as many of the
mechanisms are specific to the transport. Deciding where to implement
authorization can be more difficult, as it can take many forms.

Authorization in Asp.Net Core is ultimately claims-based, and there are a set of
.Net Core classes for representing user identity and claims which is independent
of Asp.Net. Where possible, claims should spell out everything that's needed to
enforce authorization. If this can be done without having to hit a database on
each request, it's a big win.

The service controller layer provides easy ways to specify role- and
policy-based authentication by using AuthorizeAttribute, or classes derived from
it, on endpoints. Policies can actually be quite complex, since you can define
them elsewhere and can inject arbitrary code.

For performance reasons, it may be a bad idea to rely on database accesses in
policies, since they may end up being redundant with other database accesses
that need to be done anyway to implement an endpoint. Also, policy tests may
occur before other, lighter-weight tests have an opportunity to reject a
request, creating an opportunity for denial-of-service scenarios.

Sometimes what you're trying to effect is resource-based authorization, so
claims may have to be compared to data associated with an entity in the
database. Such tests really must be done in the service layer.

This raises questions of how to signal auth errors between the service layer and
the HTTP layer. Exceptions seem appropriate, but the signalling has to be
discriminating enough for the HTTP layer to choose appropriate responses. To
effect multi-tenancy without the opportunity for probing attacks, you may want
some kinds of authorization errors to be signaled simply as missing data, while
in other cases it's more appropriate to be explicit about a lack of
authorization.

## More questions

For future revisions:

* Validation?
* Design for Testing?
* Error handling?
* Atomicity?
* The third layer - repository? When is this appropriate?
