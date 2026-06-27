#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5
#define RST_PIN 27
#define TRIG_PIN 25  // Use safe GPIOs
#define ECHO_PIN 26
#define LED_PIN 2

const char* ssid = "Muhsin";
const char* password = "12345678";
const char* serverUrl = "http://192.168.143.53:5000/api/shelf";

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("RFID reader initialized.");

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Connected!");
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String rfidTag = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      rfidTag += String(rfid.uid.uidByte[i], HEX);
    }
    rfidTag.toUpperCase();

    String productName = "Demo Product";

    Serial.println("Card Scanned. Waiting 5 seconds...");
    digitalWrite(LED_PIN, HIGH);
    delay(5000);

    float distance = getDistance();
    Serial.print("Distance after 5s: ");
    Serial.println(distance);

    String status = (distance <= 7.0) ? "available" : "removed";

    sendData(productName, rfidTag, status);
    digitalWrite(LED_PIN, LOW);
    delay(2000);
  }
}

float getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2;
}

void sendData(String productName, String rfidTag, String status) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"productName\":\"" + productName + 
                  "\", \"rfid\":\"" + rfidTag + 
                  "\", \"status\":\"" + status + "\"}";

    Serial.println("Sending: " + json);
    int httpCode = http.POST(json);
    Serial.print("HTTP Response: ");
    Serial.println(httpCode);
    http.end();
  }
}
