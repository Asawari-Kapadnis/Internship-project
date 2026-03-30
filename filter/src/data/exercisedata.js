const exercisesData = [
{
id:1,
name:"Push Ups",
category:"Strength",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Chest","Shoulders","Triceps"],
benefits:["Builds upper body strength","Improves endurance","Strengthens core"],
steps:[
"Start in plank position with hands slightly wider than shoulders",
"Keep body straight from head to heels",
"Lower body until chest nearly touches floor",
"Push back up to starting position"
],
image:"https://images.unsplash.com/photo-1599058917765-a780eda07a3e"
},

{
id:2,
name:"Squats",
category:"Strength",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Quadriceps","Glutes","Hamstrings"],
benefits:["Strengthens legs","Improves balance","Burns calories"],
steps:[
"Stand with feet shoulder width apart",
"Lower hips like sitting in a chair",
"Keep chest up and back straight",
"Push through heels to stand"
],
image:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
},

{
id:3,
name:"Plank",
category:"Core",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Core","Back","Shoulders"],
benefits:["Improves posture","Strengthens core","Enhances balance"],
steps:[
"Start in forearm plank position",
"Keep elbows under shoulders",
"Maintain straight body line",
"Hold position for 30–60 seconds"
],
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5oFMqgYe_u3Jk4ixHYMzF5skbJp_k_6VZsg&s"
},

{
id:4,
name:"Lunges",
category:"Strength",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Glutes","Quadriceps","Hamstrings"],
benefits:["Improves balance","Strengthens legs","Boosts mobility"],
steps:[
"Stand upright",
"Step forward with one leg",
"Lower hips until knees bend 90 degrees",
"Push back to starting position"
],
image:"https://images.unsplash.com/photo-1605296867424-35fc25c9212a"
},

{
id:5,
name:"Jumping Jacks",
category:"Cardio",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Full Body"],
benefits:["Improves heart health","Burns calories","Boosts stamina"],
steps:[
"Stand straight with feet together",
"Jump spreading legs and raising arms",
"Jump back to starting position",
"Repeat continuously"
],
image:"https://images.unsplash.com/photo-1549060279-7e168fcee0c2"
},

{
id:6,
name:"Burpees",
category:"Cardio",
difficulty:"Intermediate",
equipment:"None",
targetMuscles:["Full Body"],
benefits:["High calorie burn","Improves strength","Enhances endurance"],
steps:[
"Start standing",
"Drop into squat and place hands on floor",
"Jump feet back into plank",
"Return to squat and jump upward"
],
image:"https://images.unsplash.com/photo-1517838277536-f5f99be501cd"
},

{
id:7,
name:"Mountain Climbers",
category:"Cardio",
difficulty:"Intermediate",
equipment:"None",
targetMuscles:["Core","Legs","Shoulders"],
benefits:["Improves agility","Strengthens core","Burns fat"],
steps:[
"Start in plank position",
"Bring one knee toward chest",
"Switch legs quickly",
"Continue alternating legs"
],
image:"https://images.unsplash.com/photo-1518611012118-696072aa579a"
},

{
id:8,
name:"Bench Press",
category:"Strength",
difficulty:"Intermediate",
equipment:"Barbell or Dumbbells",
targetMuscles:["Chest","Triceps","Shoulders"],
benefits:["Builds chest strength","Improves pushing power"],
steps:[
"Lie on bench",
"Grip bar slightly wider than shoulders",
"Lower bar to chest",
"Push bar back up"
],
image:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
},

{
id:9,
name:"Deadlift",
category:"Strength",
difficulty:"Advanced",
equipment:"Barbell",
targetMuscles:["Back","Glutes","Hamstrings"],
benefits:["Improves overall strength","Builds muscle mass"],
steps:[
"Stand with feet hip width apart",
"Grip barbell",
"Lift bar keeping back straight",
"Lower bar slowly"
],
image:"https://images.unsplash.com/photo-1517960413843-0aee8e2b3285"
},

{
id:10,
name:"Bicep Curl",
category:"Strength",
difficulty:"Beginner",
equipment:"Dumbbells",
targetMuscles:["Biceps"],
benefits:["Builds arm strength","Improves muscle tone"],
steps:[
"Hold dumbbells at sides",
"Curl weights toward shoulders",
"Lower slowly"
],
image:"https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e"
},

{
id:11,
name:"Tricep Dips",
category:"Strength",
difficulty:"Beginner",
equipment:"Bench or Chair",
targetMuscles:["Triceps"],
benefits:["Strengthens arms","Improves upper body power"],
steps:[
"Place hands on bench",
"Lower body by bending elbows",
"Push back up"
],
image:"https://www.wikihow.com/images/thumb/f/f1/Do-Tricep-Dips-Step-3.jpg/550px-nowatermark-Do-Tricep-Dips-Step-3.jpg"
},

{
id:12,
name:"Shoulder Press",
category:"Strength",
difficulty:"Intermediate",
equipment:"Dumbbells",
targetMuscles:["Shoulders"],
benefits:["Builds shoulder muscles","Improves upper body strength"],
steps:[
"Hold dumbbells at shoulder level",
"Press weights upward",
"Lower slowly"
],
image:"https://images.unsplash.com/photo-1534367507873-d2d7e24c797f"
},

{
id:13,
name:"Leg Raises",
category:"Core",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Abs"],
benefits:["Strengthens lower abs","Improves core stability"],
steps:[
"Lie on your back",
"Lift legs upward",
"Lower slowly without touching floor"
],
image:"https://images.unsplash.com/photo-1594737625785-a6cbdabd333c"
},

{
id:14,
name:"Russian Twist",
category:"Core",
difficulty:"Intermediate",
equipment:"Medicine Ball",
targetMuscles:["Abs","Obliques"],
benefits:["Improves core rotation","Strengthens abs"],
steps:[
"Sit with knees bent",
"Lean back slightly",
"Twist torso left and right"
],
image:"https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3"
},

{
id:15,
name:"High Knees",
category:"Cardio",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Legs","Core"],
benefits:["Improves cardio fitness","Boosts agility"],
steps:[
"Run in place",
"Lift knees as high as possible"
],
image:"https://images.unsplash.com/photo-1554284126-aa88f22d8b74"
},

{
id:16,
name:"Pull Ups",
category:"Strength",
difficulty:"Advanced",
equipment:"Pull Up Bar",
targetMuscles:["Back","Biceps"],
benefits:["Builds upper body strength"],
steps:[
"Grip pull up bar",
"Pull body upward until chin above bar",
"Lower slowly"
],
image:"https://row.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F8urtyqugdt2l%2F10xMmpEB8KHP9QfDNFts0D%2F367584690c1273b2f7c33f2ff8159537%2FPull_up_desktop.jpg&w=3840&q=85"
},

{
id:17,
name:"Glute Bridge",
category:"Strength",
difficulty:"Beginner",
equipment:"None",
targetMuscles:["Glutes","Hamstrings"],
benefits:["Strengthens hips","Improves posture"],
steps:[
"Lie on back with knees bent",
"Lift hips upward",
"Lower slowly"
],
image:"https://images.unsplash.com/photo-1594737625785-a6cbdabd333c"
},

{
id:18,
name:"Side Plank",
category:"Core",
difficulty:"Intermediate",
equipment:"None",
targetMuscles:["Obliques"],
benefits:["Improves balance","Strengthens core"],
steps:[
"Lie on side",
"Lift body on forearm",
"Hold position"
],
image:"https://images.unsplash.com/photo-1594737625785-a6cbdabd333c"
},

{
id:19,
name:"Cycling",
category:"Cardio",
difficulty:"Beginner",
equipment:"Bicycle",
targetMuscles:["Legs"],
benefits:["Improves heart health","Burns calories"],
steps:[
"Adjust seat height",
"Start pedaling at moderate pace"
],
image:"https://images.unsplash.com/photo-1517649763962-0c623066013b"
},

{
id:20,
name:"Jump Rope",
category:"Cardio",
difficulty:"Beginner",
equipment:"Skipping Rope",
targetMuscles:["Full Body"],
benefits:["Improves coordination","Burns fat"],
steps:[
"Hold rope handles",
"Swing rope over head",
"Jump as rope reaches feet"
],
image:"https://images.unsplash.com/photo-1546483875-ad9014c88eba"
}
];

export default exercisesData;