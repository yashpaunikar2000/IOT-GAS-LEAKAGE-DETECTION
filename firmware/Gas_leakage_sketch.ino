int ledPin = 10;
int buzzerPin = 9;
int gasSensorPin = A0;
int gasValue = 0;
int threshold = 350; 

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  gasValue = analogRead(gasSensorPin);

  // Send gas value to Node.js
  Serial.print("GAS:");
  Serial.println(gasValue);

  if (gasValue > threshold) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(buzzerPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(buzzerPin, LOW);
  }

  delay(300);
}
