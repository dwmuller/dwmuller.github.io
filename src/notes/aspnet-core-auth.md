---
title: Asp.Net Core 3 Authentication and Authorization
tags: 
    - tools
    - techniques
layout: note.html
---
# {{title}}

** Work in Progress **

Working with the
[ASP.NET](https://dotnet.microsoft.com/learn/aspnet/what-is-aspnet) Core
[Authentication (authN) and Authorization
(authZ)](https://docs.microsoft.com/en-us/aspnet/core/security/?view=aspnetcore-5.0)
system can be frustrating if you're trying to do anything that doesn't closely
match an available example. There are lots of how-to articles (although beware
version differences), but precious little digestible writing about how the many
parts interact, what the various customization points are (other than a few main
ones), and even less on the philosophies that guided the architecture. I've been
studying it lately and will try to fill those gaps a little as I learn more.

I've been trying to do some slightly unusual things within a Web API and its
associated SPA recently. To get authN and authZ right, I really couldn't follow
any readily available examples, and I hate just throwing things at the wall to
see what sticks -- especially when it comes to security. So, because of the
aforementioned gaps, I had little choice but to delve into the source code.
That's ultimately very enlightening, and I'm thankful that it's all open source
now, but it's also very time-consuming.

Let's talk about what's going on in this code. This will be a mostly bottom-up
approach. First I'll touch briefly on authN vs authz. Then I'll talk about some
key data structures, how they are used (authZ), and then how they're produced
(authN).

I hope it will give you some mental tools to apply to your own specific
authN and authZ needs.

## AuthN vs. AuthZ

You can read textbook definitions of authentication vs. authorization in
numerous places (including Microsoft's ASP.NET security overview referenced
earlier). In the context of an ASP.NET Web app, more concretely:

The **authentication** subsystem examines an incoming request for evidence of
identity, and when found and validated, usually translates it to the bits and
pieces that make up a `ClaimsPrincipal`. It also drives reactions to
authentication failures.

The **authorization** subsystem applies rules that you define, to determine
whether the sender of a request has permission to do something, like retrieve or
modify data. These rules primarily operate on the data in `ClaimsPrincipal`.

So, in a sense, this `ClaimsPrincipal` type is what ties the authN and authZ
subsystems together. Let's examine it in some detail.

## Principals, Identities, and Claims

A 'principal' refers, in this context, to the sender of a request. It represents
*who* that person is (identity) and *what* we know about him or her (claims).
It's represented by a `ClaimsPrincipal` object. During request handling, you
usually reference this object as the `User` property of an `HttpContext`. The
`HttpContext` object is usuallly accessible throughout the request processing
pipeline and related machinery of ASP.NET.

Because people (or systems) can have different identities in different contexts,
a `ClaimsPrincipal` contains multiple `ClaimsIdentity` objects. Each represents
an "identity" of the caller. Usually, each `ClaimsIdentity` object is provided
by one "authentication scheme", which we'll define later. You can also create
and add identity objects yourself. In many systems with simple authentication
needs, there is only a single identity object in a principal.

Each `ClaimsIdentity` object contains a list of `Claim` objects. A claim can be
thought of as a fact about the identity, or about the person/system/thing
represented by the identity. These are organized as keyword/value pairs. The
string keyword is called the "claim type", and the value is also a string, which
can contain just about anything. Note that `ClaimsIdentity.Claims` is a list,
not a dictionary. Although most claims are expected to be present just once in
an identity, it's also possible to have multiple values with the same claim
type.

Two common examples of claim types are *name* and *role*. The specific claim
type string used isn't important, but these two concepts are important in some
contexts. Role-based security, for example, is explicitly supported in the auth
framework, and a role claim will have as its value a role name, or a list of
role names. It states that this identity can assume these roles.

The concept of claims exists in the security world outside of ASP.NET. For
example, the OAuth 2 and OpenID standards (which deal, respectively, with
delegation of authorization, and authentication) define some standard claims,
and some of the available authentication implementations in ASP.NET Core can map
claims between your desired claim arrangement and systems that implement those
standards. In your own system, you may make use of those claims, or you may
define your own claims that come from, say, a user database that you manage.

By the way, these three types -- `ClaimsPrincipal`, `ClaimsIdentity`, and
`Claim` -- are defined in the .NET Core runtime. They're more basic than the
ASP.NET framework for Web applications.

Next, we'll talk about the authorization subsystem, which is the primary
consumer of these claims.

## Authorization

At its heart, ASP.NET Core authorization is claims-based. In order to determine
whether a user has permission to do something or not, you usually look for
claims in the `ClaimsPrincipal` associated with a request.

The machinery for doing this is surprisingly complicated. Let's look at what the
machinery does, by default, from the top down -- where 'top' here is the
middleware that you add to the request pipeline by calling UseAuthorization.

### `AuthorizationPolicy`, `IAuthorizationRequirement`, and authentication schemes

TODO: Explain these low-level data structures.

### `AuthorizationMiddleware.Invoke(HttpContext)`

See [`AuthorizationMiddleware`](https://source.dot.net/#Microsoft.AspNetCore.Authorization.Policy/AuthorizationMiddleware.cs).
See [`AuthorizationPolicy`](https://source.dot.net/#Microsoft.AspNetCore.Authorization/AuthorizationPolicy.cs).

- Endpoint must be known - added to `HttpContext` by routing middleware earlier in pipeline.
- Gets metadata about the endpoint, an ordered list of `IAuthorizeData`. (Basically, AuthorizeAttribute objects.)
- Calls static `AuthorizationPolicy.CombineAync` with the `IAuthorizationPolicyProvider` and the metadata to get a policy.
- Bails out the policy is null.
- Calls `IPolicyEvaluator.AuthenticateAsync` with the policy and HttpContext to get an `AuthenticateResult`. (The policy evaluator object has a "transient" lifetime?)
- Bails out if any of the endpoint metadata is `IAllowAnonymous`. (Basically, an `AllowAnonymousAttribute`.)
- Calls `IPolicyEvaluator.AuthorizeAsync` with the policy, `AuthenticateResult`, and HttpContext (and maybe the endpoint) to get an `AuthorizeResult`.
- Calls `IAuthorizationMiddlewareResultHandler.HandleAsync` with next, HttpContext, policy, and authorizeResult.

`CombineAsync` basically combines all the applicable `AuthorizeAttribute`
objects and the authorization requirements that they specify into one policy,
represented as an `AuthorizationPolicy` object. The details of how that's done
are unimportant, except for one detail which is hard to find in Microsoft
documentation: All authorization requirements are ANDed. You can have multiple
Authorize attributes on an endpoint method, and on its containing class, and
these all end up in the metadata list for the endpoint.

Customization points:
- IAuthorizationPolicyProvider from DI, defaults to ?
- IPolicyEvaluator from DI, defaults to?
- IAuthorizationMiddlewareResultHandler from DI, defaults to?

## default AuthenticateAsync
## default AuthorizeAsync
## default result HandleAsync

 -> IPolicyEvaluator (transient)
IAuthorizationService, DefaultAuthorizationService
IAuthorizationPolicyProvider
IAuthorizationRequirement - empty interface!
IAuthorizationHandler, AuthorizationHandler<TReq>
AuthorizationHandlerContext
AuthorizationPolicy
IAuthorizationPolicyProvider, DefaultAuthorizationPolicyProvider

## Authentication


## TODO
- Add links to source code
- Be specific about version
- Build out details of authZ more.