---
title: KeePass
tags: 
    - tools
    - techniques
layout: note.html
---
# {{title}}
You use a password vault, right? 

Everyone who is a prolific Internet denizen should use a password vault. Rule #2 for personal security is: Don't use the same password in multiple places. (Rule #1 is: Use a strong password.) Most of us have dozens of online sites that we log into, so a password vault is a necessity. There's no other safe way to manage large numbers of passwords.

Once you're using a password vault that you trust, especially one that integrates well with your Web browser and is available on all your computing devices, then almost all of your passwords should be long and randomly generated. The only exceptions are passwords that you need to frequently type in somewhere where you can't paste text. An example might be your Windows account password, if your Windows computer requires you to type it in to log in. 

There are many online password vaults that are easy to use and either free or relatively inexpensive: Bitwarden, Dashlane, Keeper, LastPass, and 1Password, to name just a few. If you are comfortable being locked into a single Web browser, you can also use the password vault built into it -- Chrome and Firefox both have this feature, and if you have a Google or Mozilla account, respectively, you the vault can be synchronized across your devices.

If you crave more flexibilty and features, and are comfortable with more complexity in setup and slight more complexity in daily use, [KeePass](https://keepass.info/) is a powerful and flexible free alternative for Windows. It's what we use in our household. Unlike the online password services mentioned earlier, KeePass is file-based. The files are strongly encrypted, and if you use a good password (or other key mechanism), then there is little risk of a file being cracked. We use the [KeeAnywhere](https://keeanywhere.de/) plugin to easily save password files in the cloud, and this lets us share our vault across devices. It works with most of the common cloud storage providers. (See their site.) On our phones, we use [Keepass2Android](https://play.google.com/store/apps/details?id=keepass2android.keepass2android), a KeePass-compatible Android app. I believe there are KeePass-compatible programs for Apple devices as well. (Happy to add more info on this if someone sends me specific positive personal recommendations.)

Following are some things to consider if you use KeePass, as well as tips that leverage its advanced features or plugins.

## Disaster Recovery

When choosing a cloud storage provider to host your KeePass file, keep disaster recovery in mind. What if you were to lose all your computing devices, e.g. in a house fire? Assume you're setting up a new computer or phone, starting from scratch. You will of course remember your vault's password, since you use it frequently. (If you're using a browser's built-in vault, this could be a sticking point!) Installing KeePass and KeeAnywhere is straightforward, but you'll also need to know your cloud provider credentials, without referencing your password vault, which you don't have yet. So you either need to have these cached somewhere super-safe, or you'll have to remember them. This is one reason that we chose to use OneDrive; it's tied to our Windows accounts, which we use regularly to log into our computers. If a cloud provider allows you to log in with federated credentials (i.e. they let you use your Google, Microsoft, or Facebook identity to log in), then that could be a good solution as well.

Another approach to disaster recovery might involve keeping a backup copy of your vault file somewhere other than in your house. 

## Browser Integration

Most commercial password vaults come with browser plug-ins that can automatically enter credentials on Web sites for you. This is an important security feature! They only offer the credentials if the site's address matches the entry in the vault. If someone tricks you into visiting a phishing site (and it can happen to *any* of us), the address won't match, and you should pay attention when your vault software behaves unexpectedly like this.

There are no "official" plug-ins with KeePass, but there are a bunch to choose from. Search for KeePass among the plugins available for your particular browser. I mostly use [Kee](https://www.kee.pm/) with Firefox - but be aware that their software also occasionally advertises their paid Kee Vault service to you. (They is an online password vault based on KeePass, which might be interesting if you don't want to deal with the cloud provider considerations mentioned in the previous section.)

## Sharing is Caring

Some online providers may provide family accounts with separate logins for family members -- I really haven't looked to see if they offer this feature at price points acceptable for non-corporate use. (I know that some of them have corporate offerings that definitely have this feature, e.g. Keeper.)

With KeePass, if you want to share your vault with family members, you will *have* to share your vault password, and you will have to share the cloud file between family members. That could be done by sharing a cloud storage account (which could be very inconvenient with commonly-used logins like Microsft or Google), or via file sharing, if the cloud storage provider supports that. I know that it's pretty easy with Google, and a little harder with OneDrive, due to limitations in KeeAnywhere. (I've submitted a pull request to partially fix that.)

KeePass works like most file-based desktop apps. Changes you make are kept in memory until you save the file. But sharing is still facilitated by excellent merge functionality, which is offered when you save a file and KeePass notices that the saved version was changed since you last opened or saved. Just make sure that all your users know to choose the Merge option when saving, and not the Overwrite option.

By the way, this is why I would *not* recommend using KeePass as a corporate solution to sharing passwords. If you have more than a few users, this becomes unwieldy and scary. And although KeePass keeps a nice history log attached to each entry, it has no way of distinguishing different users for auditing purpose - a feature that a corporate solution absolutely must have.

## "Security Questions"

I hate these. "What is your mother's maiden name?" "None of your damn business."

When a Web site insists on these, I treat them like additional passwords. KeePass has the ability to associate arbitrary "Properties" with an entry, basically a keyword/value pair. You can choose to keep the value encrypted in memory, and by right-clicking on a property in the user interface, you can copy the value to the clipboard without ever exposing it.

I use KeePass's built-in password generator to generate a list of password strings. Then I use these as answers to the security questions. I store each as a secure property value, with the question itself as the keyword string.

I also use properties for a few other things, e.g. associating a Sneakemail address with an account (if the email address isn't used the user name already). Sneakemail is another whole topic, though ...

## Multi-Factor Authentication (MFA) Time-based One Time Passwords (TOTP)

MFA! TOTP! Gotta love the welter of additional acronyms that the security field bestows on us.

You know what TOTPs are, right? They're the numeric codes that are generated for you by a phone app like [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2), which change over time. They are used as a second factor when logging into something, for extra security. They're a great enhancement to the security of an account.

KeePass has some built-in support for TOTP codes (and other kinds of one-time-passwords, I think). You can store the TOTP seed (which is what is encoded in those QR codes that you scan) in an entry along with the password, and KeePass knows how to generate the codes from that.

Now, letting KeePass generate these for you will bother some people. It does violate one of the intents of MFA, which is to present multiple factors of different kinds - something you know (a password), something you have (a phone that generate TOTP codes, or a hardware security key), something you are (biometric data like a fingerprint or face). By keeping the TOTP key alongside your password in KeePass, you've reduced it to another thing you know. Or is it a thing you have? Because, like, your randomly-generated password isn't really a thing you know, either. It's a thing you have, in your KeePass database.

As you can see, these categories are a bit of a chimera. They are all ultimately data that can be stored and possibly intercepted. TOTP still adds security, because even if your password is somehow intercepted, or stolen from a service provider (which really shouldn't be possible if they're doing things right, but it *happens all the time*), a hacker still won't have the TOTP seed, which never leaves your KeePass database.

So, given that I am comfortable with the security offered by the encrypted KeePass database and how I use it, I am OK with having it generate TOTP codes for me. I won't go into the details of how it's done here. It's a little arcane, really. But the [KeePassOTP](https://github.com/Rookiestyle/KeePassOTP) plugin adds some extra UI to make it really easy. Take a look at that site.

Note that retrieving generated codes is awkward in Keepass2Android, but possible.

## SSH Keys

This is a feature that I, as a software developer, absolutely love. I can keep all my SSH keys in KeePass, and serve them to programs using the SSH agent mechanism. This is facilitated by the [KeeAgent](https://lechnology.com/software/keeagent/) plugin.

For details, see my note on [Managing SSH Keys](/notes/managing-ssh-keys/).

