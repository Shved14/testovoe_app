Create a Paywall screen for a meditation mobile app using React Native + Expo.
It should feel premium and calm.
Use SafeAreaView and ScrollView.
Include title, benefits list and two pricing plans.




Improve the design to feel more premium:
- add soft purple/blue gradient background
- improve typography hierarchy
- add rounded cards with shadow
- highlight yearly plan as best value
- make spacing more elegant







Ensure this layout works properly on small screens like iPhone SE.
Avoid fixed heights.
Use responsive spacing and flexbox.
Make sure content scrolls properly.




------------------------------------
Create a SubscriptionContext with isSubscribed boolean.
Default false.
Add subscribe() function.
Wrap the app with provider.


When pressing "Start Free Trial":
- call subscribe()
- navigate to MeditationsScreen

--------------------------
Create MeditationsScreen with FlatList of meditation cards.
Each card: image, title, duration.
If isSubscribed === false:
- lock 3 items
- reduce opacity
- show lock icon overlay
- onPress navigate back to Paywall

-----------------------------

Add a section "AI Mood of the Day" with three emoji buttons.
When pressed, generate a short affirmation text based on mood.
Mock the response for now.
Show it in a modal.


Add loading state and small animation when generating affirmation.

