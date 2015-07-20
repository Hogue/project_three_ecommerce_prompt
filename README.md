# project_three_ecommerce_prompt

## Live Page:
[Nozama Books](http://arcane-escarpment-7767.herokuapp.com)


### Instructions:
1. Git clone this repo
2. Run `npm install` in the main directory
3. Run `npm start` or go to the above link to see live!



##Project Details:

### User Stories
User stories -

products view
individual product view
cart view
checkout
user profile
product history



Ellis - first three

Hogue - cart view & checkout

Lindsey Grimes - last two

User profile

1. User can reach this by a link in the header (probably at the far right, where the sign in/sign up button will be); spaced away or otherwise demarcated as different from the other nav bar sections. The link for this only appears when the user is logged in - if the user is not logged in, it is the sign up/sign in buttons. The page itself will also show an error message if the user is not logged in.

2. To a logged-in user, the page will show:
User's name
User's addresses on file
An 'edit' button that allows them to: change their name, add or delete addresses, and delete their order history.
A link to user's order history (or we could have it open out on the same page.)
(Could have their credit card info on file if they so choose, but that seems like a stretch goal/unsafe).

Order history

1. Will show a list of all the user's purchases (again, to the logged-in user only), in order from most recent to least recent.
2. Each purchase listing includes:
Item information: title, seller, isbn, etc (see user story on product pages for this model’s list of attributes). (May not need to display every attribute of the item here since it is easily accessible from the product page.)
A link to the product page.
A link to the review section of the product page for the user to leave a review.)
Date purchased
(Stretch goals - Could add date shipped, return information, probably other information)

General Shopping Cart Wants
as a user I want to know how many items are in my cart at all times

Shopping Cart Page — when I’m on the shopping cart page, I want to be able to...
get back to shopping (previous page)
know my subtotal and total number of items, right away
see an itemized list of my selections
remove an item
increase or decrease an item’s quantity
proceed to checkout

Checkout — during the checkout process I want to be able to...
go back to the previous page and not loose my progress
use my shipping address for billing, without having to fill billing out
choose from a variety of shipping methods
confirm my order before checking out
before checking out i want to see and review...
shipping address
billing information
pending purchases

### Wireframes

![cart 1](http://i.imgur.com/MP7WW1k.png)
![cart 2](http://i.imgur.com/qEFoydY.png)
![cart 3](http://i.imgur.com/TMc5Kwq.png)
![cart 4](http://i.imgur.com/42SRhPF.png)
![cart 5](http://i.imgur.com/KjEfkSD.png)

### Git Flow

OUR PROCESS:

git checkout -b development origin/development
Everybody now has a local copy of the historical branches set up.

Mary and John begin new features

Our example starts with John and Mary working on separate features. They both need to create separate branches for their respective features. Instead of basing it on master, they should bothbase their feature branches on develop:

git checkout -b some-feature development
Both of them add commits to the feature branch in the usual fashion: edit, stage, commit:

git status
git add <some-file>
git commit
Mary finishes her feature

After adding a few commits, Mary decides her feature is ready. If her team is using pull requests, this would be an appropriate time to open one asking to merge her feature into development. Otherwise, she can merge it into her local development and push it to the central repository, like so:

git pull origin development
git checkout development
git merge some-feature
git push
git branch -d some-feature
The first command makes sure the development branch is up to date before trying to merge in the feature. Note that features should never be merged directly into master. Conflicts can be resolved in the same way as in the Centralized Workflow.

Mary begins to prepare a release

While John is still working on his feature, Mary starts to prepare the first official release of the project. Like feature development, she uses a new branch to encapsulate the release preparations. This step is also where the release’s version number is established:

git checkout -b release-0.1 development
This branch is a place to clean up the release, test everything, update the documentation, and do any other kind of preparation for the upcoming release. It’s like a feature branch dedicated to polishing the release.

As soon as Mary creates this branch and pushes it to the central repository, the release is feature-frozen. Any functionality that isn’t already in development is postponed until the next release cycle.

Mary finishes the release

Once the release is ready to ship, Mary merges it into master and development, then deletes the release branch. It’s important to merge back into development because critical updates may have been added to the release branch and they need to be accessible to new features. Again, if Mary’s organization stresses code review, this would be an ideal place for a pull request.

git checkout master
git merge release-0.1
git push
git checkout development
git merge release-0.1
git push
git branch -d release-0.1
Release branches act as a buffer between feature development (development) and public releases (master). Whenever you merge something into master, you should tag the commit for easy reference:

git tag -a 0.1 -m "Initial public release" master
git push --tags
Git comes with several hooks, which are scripts that execute whenever a particular event occurs within a repository. It’s possible to configure a hook to automatically build a public release whenever you push the master branch to the central repository or push a tag.

