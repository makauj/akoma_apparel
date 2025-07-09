#!/bin/bash

echo "🧪 Testing Payment API"
echo "======================="

# Test data
TEST_EMAIL="test@example.com"
TEST_PASSWORD="testpassword123"
TEST_NAME="Test User"

echo "📝 Step 1: Register/Login test user..."

# Try to register first (or get existing user)
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$TEST_NAME\",
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "Register response: $REGISTER_RESPONSE"

# If registration fails (user might already exist), try login
if echo "$REGISTER_RESPONSE" | grep -q "error\|Error"; then
  echo "🔑 User might already exist, trying login..."
  
  LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/users/login \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"$TEST_EMAIL\",
      \"password\": \"$TEST_PASSWORD\"
    }")
  
  echo "Login response: $LOGIN_RESPONSE"
  TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
else
  # Extract token from registration response
  TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
fi

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get authentication token"
  exit 1
fi

echo "✅ Got authentication token: ${TOKEN:0:20}..."

echo ""
echo "💳 Step 2: Testing payment checkout..."

# Test payment request
PAYMENT_RESPONSE=$(curl -s -X POST http://localhost:5000/api/payments/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "items": [
      {
        "name": "Test T-Shirt",
        "price": 2999,
        "quantity": 1
      },
      {
        "name": "Test Hoodie", 
        "price": 4999,
        "quantity": 2
      }
    ]
  }')

echo "💰 Payment Response:"
echo "$PAYMENT_RESPONSE" | jq . 2>/dev/null || echo "$PAYMENT_RESPONSE"

# Check if we got a session URL
if echo "$PAYMENT_RESPONSE" | grep -q "url"; then
  echo ""
  echo "🎉 SUCCESS! Payment checkout session created!"
  echo "✅ The payment API is working correctly!"
  
  # Extract and display the checkout URL
  CHECKOUT_URL=$(echo "$PAYMENT_RESPONSE" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
  echo ""
  echo "🌐 Stripe Checkout URL: $CHECKOUT_URL"
  echo ""
  echo "💡 You can visit this URL to complete a test payment"
else
  echo ""
  echo "❌ Payment checkout failed or returned unexpected response"
fi
