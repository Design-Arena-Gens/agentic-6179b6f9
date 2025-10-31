import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const { age, weight, height, gender, activityLevel, goal, dietaryRestrictions, healthConditions, consultationType } = formData

    // Calculate BMI
    const heightInMeters = parseInt(height) / 100
    const bmi = (parseInt(weight) / (heightInMeters * heightInMeters)).toFixed(1)

    // Calculate BMR (Basal Metabolic Rate)
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * parseInt(weight) + 6.25 * parseInt(height) - 5 * parseInt(age) + 5
    } else {
      bmr = 10 * parseInt(weight) + 6.25 * parseInt(height) - 5 * parseInt(age) - 161
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    const tdee = Math.round(bmr * activityMultipliers[activityLevel])

    // Determine calorie goal based on objective
    let calorieGoal: number
    let calorieAdjustment: string
    switch (goal) {
      case 'lose_weight':
        calorieGoal = tdee - 500
        calorieAdjustment = 'deficit of 500 calories for healthy weight loss'
        break
      case 'gain_muscle':
        calorieGoal = tdee + 300
        calorieAdjustment = 'surplus of 300 calories for muscle growth'
        break
      default:
        calorieGoal = tdee
        calorieAdjustment = 'maintenance level'
    }

    // Generate comprehensive advice
    let advice = `# Your Personalized Fitness & Nutrition Plan\n\n`

    advice += `## Your Metrics\n`
    advice += `- BMI: ${bmi} kg/m²\n`
    advice += `- Basal Metabolic Rate: ${Math.round(bmr)} calories/day\n`
    advice += `- Total Daily Energy Expenditure: ${tdee} calories/day\n`
    advice += `- Recommended Daily Calories: ${calorieGoal} calories (${calorieAdjustment})\n\n`

    if (consultationType === 'both' || consultationType === 'nutrition') {
      advice += `## Nutrition Plan\n\n`

      advice += `### Daily Macros\n`
      const proteinGrams = Math.round(parseInt(weight) * 2)
      const fatGrams = Math.round((calorieGoal * 0.25) / 9)
      const carbGrams = Math.round((calorieGoal - (proteinGrams * 4 + fatGrams * 9)) / 4)

      advice += `- Protein: ${proteinGrams}g (supports muscle growth and repair)\n`
      advice += `- Carbohydrates: ${carbGrams}g (provides energy for workouts)\n`
      advice += `- Fats: ${fatGrams}g (essential for hormone production)\n\n`

      advice += `### Meal Structure\n`
      advice += `- Breakfast: ${Math.round(calorieGoal * 0.25)} calories\n`
      advice += `- Lunch: ${Math.round(calorieGoal * 0.35)} calories\n`
      advice += `- Dinner: ${Math.round(calorieGoal * 0.30)} calories\n`
      advice += `- Snacks: ${Math.round(calorieGoal * 0.10)} calories\n\n`

      advice += `### Recommended Foods\n`

      if (dietaryRestrictions.toLowerCase().includes('vegetarian') || dietaryRestrictions.toLowerCase().includes('vegan')) {
        advice += `**Protein Sources (Plant-Based):**\n`
        advice += `- Lentils, chickpeas, black beans\n`
        advice += `- Tofu, tempeh, edamame\n`
        advice += `- Quinoa, seitan\n`
        advice += `- Nuts and seeds\n\n`
      } else {
        advice += `**Protein Sources:**\n`
        advice += `- Chicken breast, turkey, lean beef\n`
        advice += `- Fish (salmon, tuna, cod)\n`
        advice += `- Eggs and egg whites\n`
        advice += `- Greek yogurt, cottage cheese\n\n`
      }

      advice += `**Complex Carbohydrates:**\n`
      if (!dietaryRestrictions.toLowerCase().includes('gluten')) {
        advice += `- Oatmeal, whole grain bread\n`
        advice += `- Brown rice, quinoa\n`
      } else {
        advice += `- Quinoa, rice\n`
        advice += `- Gluten-free oats\n`
      }
      advice += `- Sweet potatoes, regular potatoes\n`
      advice += `- Fruits (bananas, berries, apples)\n\n`

      advice += `**Healthy Fats:**\n`
      advice += `- Avocados\n`
      advice += `- Olive oil, coconut oil\n`
      advice += `- Nuts (almonds, walnuts)\n`
      advice += `- Seeds (chia, flax, pumpkin)\n\n`

      advice += `### Hydration\n`
      advice += `- Drink at least ${Math.round(parseInt(weight) * 0.033)} liters of water daily\n`
      advice += `- Add 500ml for every hour of exercise\n`
      advice += `- Monitor urine color (should be pale yellow)\n\n`

      if (dietaryRestrictions) {
        advice += `### Dietary Considerations\n`
        advice += `Based on your restrictions: ${dietaryRestrictions}\n`
        advice += `Make sure to supplement any nutrients that might be lacking in your diet.\n\n`
      }
    }

    if (consultationType === 'both' || consultationType === 'fitness') {
      advice += `## Fitness Plan\n\n`

      if (goal === 'lose_weight') {
        advice += `### Weekly Workout Schedule (Focus: Fat Loss)\n\n`
        advice += `**Monday - Full Body Strength**\n`
        advice += `- Squats: 3 sets x 12 reps\n`
        advice += `- Push-ups: 3 sets x 15 reps\n`
        advice += `- Dumbbell rows: 3 sets x 12 reps\n`
        advice += `- Plank: 3 sets x 45 seconds\n\n`

        advice += `**Tuesday - Cardio**\n`
        advice += `- 30 minutes moderate intensity (running, cycling, or swimming)\n`
        advice += `- Or HIIT: 20 minutes (30 sec sprint, 30 sec rest)\n\n`

        advice += `**Wednesday - Active Recovery**\n`
        advice += `- Light yoga or stretching\n`
        advice += `- 20-minute walk\n\n`

        advice += `**Thursday - Upper Body**\n`
        advice += `- Bench press or push-ups: 3 sets x 12 reps\n`
        advice += `- Shoulder press: 3 sets x 12 reps\n`
        advice += `- Bicep curls: 3 sets x 15 reps\n`
        advice += `- Tricep dips: 3 sets x 12 reps\n\n`

        advice += `**Friday - Cardio**\n`
        advice += `- 30-40 minutes steady state\n`
        advice += `- Mix of incline walking or jogging\n\n`

        advice += `**Saturday - Lower Body**\n`
        advice += `- Lunges: 3 sets x 12 reps per leg\n`
        advice += `- Deadlifts: 3 sets x 10 reps\n`
        advice += `- Leg press: 3 sets x 15 reps\n`
        advice += `- Calf raises: 3 sets x 20 reps\n\n`

        advice += `**Sunday - Rest**\n`
        advice += `- Complete rest or light stretching\n\n`

      } else if (goal === 'gain_muscle') {
        advice += `### Weekly Workout Schedule (Focus: Muscle Growth)\n\n`
        advice += `**Monday - Chest & Triceps**\n`
        advice += `- Barbell bench press: 4 sets x 8-10 reps\n`
        advice += `- Incline dumbbell press: 3 sets x 10-12 reps\n`
        advice += `- Cable flyes: 3 sets x 12-15 reps\n`
        advice += `- Tricep pushdowns: 3 sets x 12 reps\n`
        advice += `- Overhead tricep extension: 3 sets x 12 reps\n\n`

        advice += `**Tuesday - Back & Biceps**\n`
        advice += `- Deadlifts: 4 sets x 6-8 reps\n`
        advice += `- Pull-ups: 3 sets x max reps\n`
        advice += `- Barbell rows: 3 sets x 10 reps\n`
        advice += `- Barbell curls: 3 sets x 12 reps\n`
        advice += `- Hammer curls: 3 sets x 12 reps\n\n`

        advice += `**Wednesday - Rest or Light Cardio**\n`
        advice += `- 20 minutes light walking or cycling\n\n`

        advice += `**Thursday - Shoulders & Abs**\n`
        advice += `- Military press: 4 sets x 8-10 reps\n`
        advice += `- Lateral raises: 3 sets x 12-15 reps\n`
        advice += `- Front raises: 3 sets x 12 reps\n`
        advice += `- Face pulls: 3 sets x 15 reps\n`
        advice += `- Hanging leg raises: 3 sets x 15 reps\n\n`

        advice += `**Friday - Legs**\n`
        advice += `- Squats: 4 sets x 8-10 reps\n`
        advice += `- Romanian deadlifts: 3 sets x 10 reps\n`
        advice += `- Leg press: 3 sets x 12 reps\n`
        advice += `- Leg curls: 3 sets x 12 reps\n`
        advice += `- Calf raises: 4 sets x 15 reps\n\n`

        advice += `**Saturday - Arms**\n`
        advice += `- Close-grip bench: 3 sets x 10 reps\n`
        advice += `- Dips: 3 sets x max reps\n`
        advice += `- Preacher curls: 3 sets x 12 reps\n`
        advice += `- Concentration curls: 3 sets x 12 reps\n\n`

        advice += `**Sunday - Rest**\n`
        advice += `- Complete rest and recovery\n\n`

      } else {
        advice += `### Weekly Workout Schedule (Balanced Approach)\n\n`
        advice += `**Monday, Wednesday, Friday - Strength Training**\n`
        advice += `- Full body workout\n`
        advice += `- Focus on compound movements\n`
        advice += `- 45-60 minutes per session\n\n`

        advice += `**Tuesday, Thursday - Cardio**\n`
        advice += `- 30 minutes moderate intensity\n`
        advice += `- Mix of running, cycling, or swimming\n\n`

        advice += `**Weekend - Active Recovery**\n`
        advice += `- Yoga, hiking, or sports\n`
        advice += `- Light activity for recovery\n\n`
      }

      advice += `### Progressive Overload\n`
      advice += `- Increase weights by 2-5% when you can complete all sets comfortably\n`
      advice += `- Track your workouts in a journal or app\n`
      advice += `- Focus on proper form before increasing weight\n\n`

      advice += `### Recovery Tips\n`
      advice += `- Get 7-9 hours of sleep per night\n`
      advice += `- Take rest days seriously\n`
      advice += `- Foam roll and stretch regularly\n`
      advice += `- Listen to your body and avoid overtraining\n\n`
    }

    if (healthConditions) {
      advice += `## Important Health Considerations\n`
      advice += `You mentioned: ${healthConditions}\n\n`
      advice += `**Please note:** This AI-generated plan is for general guidance only. Given your health conditions, it's crucial to:\n`
      advice += `- Consult with your healthcare provider before starting this program\n`
      advice += `- Get clearance for exercise intensity levels\n`
      advice += `- Discuss any dietary changes, especially if on medications\n`
      advice += `- Start slowly and monitor how your body responds\n\n`
    }

    advice += `## Tips for Success\n`
    advice += `- Meal prep on weekends to stay on track\n`
    advice += `- Take progress photos every 2 weeks\n`
    advice += `- Weigh yourself weekly at the same time\n`
    advice += `- Join a fitness community for support\n`
    advice += `- Be patient - sustainable results take time\n`
    advice += `- Adjust the plan based on your progress\n\n`

    advice += `## When to Reassess\n`
    advice += `- Review your progress every 4-6 weeks\n`
    advice += `- Adjust calories if weight loss/gain stalls\n`
    advice += `- Modify workouts if they become too easy or hard\n`
    advice += `- Consider working with a certified trainer or nutritionist for personalized guidance\n\n`

    advice += `---\n`
    advice += `**Remember:** Consistency is more important than perfection. Start with small changes and build sustainable habits over time.\n`

    return NextResponse.json({ advice })
  } catch (error) {
    console.error('Error generating consultation:', error)
    return NextResponse.json(
      { error: 'Failed to generate consultation advice' },
      { status: 500 }
    )
  }
}
