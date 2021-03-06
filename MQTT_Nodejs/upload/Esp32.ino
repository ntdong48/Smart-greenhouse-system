#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#define DHTTYPE DHT11
const int Pump = 16;
const int Fan = 17;
const int Lamp = 5;
String Mode = "1";


const char* ssid = "Bach Sa";
const char* password = "10101010";
const char* mqtt_server = "192.168.1.5";

//const char* ssid = "Vulpes lagopus";
//const char* password = "01247793939";
//const char* mqtt_server = "192.168.1.11";

WiFiClient espClient;
PubSubClient client(espClient);

const int DHTPin = 4;
DHT dht(DHTPin, DHTTYPE);
long now = millis();
long lastMeasure = 0;

const int pinSoilMoisture = 39;
long nowSoilMoisture = millis();
long lastSoilMoisture = 0;

const int pinLight = 34;
long nowLight = millis();
long lastLight = 0;

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  dht.begin();  
  pinMode(pinSoilMoisture, INPUT);
  pinMode(pinLight, INPUT);
  pinMode(Pump, OUTPUT);
  pinMode(Lamp, OUTPUT);
  pinMode(Fan, OUTPUT);
  
  
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();
  if (String(topic) == "garden/fan") {
    Serial.print("Changing output to ");
    if(messageTemp == "on"){
      Serial.println("on");
      digitalWrite(Fan, LOW);
      digitalWrite(LED_BUILTIN, HIGH);
    }
    else if(messageTemp == "off"){
      Serial.println("off");
      digitalWrite(Fan, HIGH);
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
  if (String(topic) == "garden/pump") {
    Serial.print("Changing output to ");
    if(messageTemp == "on"){
      Serial.println("on");
      digitalWrite(Pump, LOW);
    }
    else if(messageTemp == "off"){
      Serial.println("off");
      digitalWrite(Pump, HIGH);
    }
  }
  if (String(topic) == "garden/lamp") {
    Serial.print("Changing output to ");
    if(messageTemp == "on"){
      Serial.println("on");
      digitalWrite(Lamp, LOW);
    }
    else if(messageTemp == "off"){
      Serial.println("off");
      digitalWrite(Lamp, HIGH);
    }
  }
  if(String(topic)=="garden/mode"){
      Mode = messageTemp;
  }  
  Serial.println();  
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      client.subscribe("garden/fan");
      client.subscribe("garden/lamp");
      client.subscribe("garden/pump");
      client.subscribe("garden/mode");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

float t = 0;
float h = 0;
void Dht(){
    now = millis();
    if (now - lastMeasure > 3000) {
    lastMeasure = now;
    t = dht.readTemperature();
    h = dht.readHumidity();
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
    float hic = dht.computeHeatIndex(t, false);
    static char temperatureTemp[7];
    dtostrf(hic, 6, 2, temperatureTemp);

    static char humidityTemp[7];
    dtostrf(h, 6, 2, humidityTemp);
    client.publish("garden/temperature", temperatureTemp);
    client.publish("garden/humidity", humidityTemp);
    Serial.print("Humidity: ");
    Serial.print(h);
    Serial.print(" %\t Temperature: ");
    Serial.print(t);
    Serial.print(" *C ");  
    }
}

int l;
void Light(void){
  int readValue = 0;
  nowLight = millis();
  if (nowLight - lastLight > 3000) {
  lastLight = nowLight;
  for(int i=0; i<=9; i++){
    readValue += analogRead(pinLight);
    }
  int value = readValue/10;
  l = map(value, 1100, 4095, 0, 100);
  l = 100 - l;
  static char light[7];
  dtostrf(l, 6, 0, light);
  client.publish("garden/light", light);
//  Serial.print(l);
//  Serial.println('%');
  }
}

int s;
void SoilMoisture(void){
  int readValue = 0;
  nowSoilMoisture = millis();
  if (nowSoilMoisture - lastSoilMoisture > 3000) {
  lastSoilMoisture = nowSoilMoisture;
  for(int i=0; i<=9; i++){
    readValue += analogRead(pinSoilMoisture);
    }
  int value = readValue/10;
  s = map(value, 1100, 4095, 0, 100);
  s = 100 - s;
  static char soilmoisture[7];
  dtostrf(s, 6, 0, soilmoisture);
  client.publish("garden/soilmoisture", soilmoisture);
//  Serial.print(s);
//  Serial.println('%');
  }
}

void Auto(){
    if(s <= 1){
      digitalWrite(Pump, LOW);
      client.publish("graden/pump", "on");
    }else{
      digitalWrite(Pump, HIGH);
      client.publish("graden/pump", "off");
    }

    if(t >= 24 && h <= 20){
      digitalWrite(Fan, LOW);
      client.publish("graden/fan", "on");
    }else{
      digitalWrite(Fan, HIGH);
      client.publish("graden/fan", "off");
    }
      
    if(l <= 20){
      digitalWrite(Lamp, LOW);
      client.publish("graden/lamp", "on");
    }else{
      digitalWrite(Lamp, HIGH);
      client.publish("graden/lamp", "off");
    }
  
  }



void loop() {
  Light();
  Dht();
  SoilMoisture();
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client1");
}
