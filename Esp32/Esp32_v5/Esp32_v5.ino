#include <WiFi.h>
#include <PubSubClient.h>
#include <EEPROM.h>
#include <HTTPClient.h>
#include <ESP32httpUpdate.h>
#include "DHT.h"
#define DHTTYPE DHT11
#define EEPROM_SIZE 2
#define EEPROM_SIZE 1
#define EEPROM_SIZE 3
const char* ssid = "Don";
const char* password = "11111111";
const char* mqtt_server = "172.20.10.8";
const char *currentVersion = "1.0";
const char *serverUrl = "http://192.168.1.11:3001/upload/firmware32.bin";

//const char* ssid = "Don";
//const char* password = "11111111";
//const char* mqtt_server = "172.20.10.5";
WiFiClient espClient32;
PubSubClient client(espClient32);
const int Pump = 16;
const int Fan = 17;
const int Lamp = 5;
const int Pump2 = 18;

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


const int pinRain = 38;
long nowRain = millis();
long lastRain = 0;


String modeState = "off";
long nowMode = millis();
long lastMode = 0;

long nowNumber = millis();
long lastNumber = 0;

int numbersoi = EEPROM.read(1);
int numberhum;
int numbertemp = EEPROM.read(0);
int numberlight = EEPROM.read(2);
int numberrain = 0;
int numbermotor;
int tocdo = 10;
int goc = 0;
int goc_hientai = 0;
int nbtimer = 0;


void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  dht.begin();
  EEPROM.begin(EEPROM_SIZE);
  pinMode(pinSoilMoisture, INPUT);
  pinMode(pinLight, INPUT);
  pinMode(pinRain, INPUT);
  pinMode(Pump, OUTPUT);
  pinMode(Pump2, OUTPUT);
  pinMode(Lamp, OUTPUT);
  pinMode(Fan, OUTPUT);
  pinMode(32, OUTPUT);
  pinMode(33, OUTPUT);
  pinMode(25, OUTPUT);
  pinMode(26, OUTPUT);
  pinMode(27, OUTPUT);
  digitalWrite(Pump, HIGH);
  digitalWrite(Lamp, HIGH);
  digitalWrite(Fan, HIGH);
  goc = 0;
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
  //  Serial.print("Message arrived on topic: ");
  //  Serial.print(topic);
  //  Serial.print(". Message: ");
  String messageTemp;

  for (int i = 0; i < length; i++) {
    //    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  // Feel free to add more if statements to control more GPIOs with MQTT

  // If a message is received on the topic garden/lamp, you check if the message is either "on" or "off".
  // Changes the output state according to the message
  if (String(topic) == "garden/lamp") {
    Serial.print("Changing output to ");
    if (messageTemp == "off") {
      Serial.println("on");
      digitalWrite(Lamp, HIGH);
    }
    else if (messageTemp == "on") {
      Serial.println("off");
      digitalWrite(Lamp, LOW);
    }
  }
  if (String(topic) == "garden/pump") {
    Serial.print("Changing output to ");
    if (messageTemp == "off") {
      Serial.println("on");
      digitalWrite(Pump, HIGH);
    }
    else if (messageTemp == "on") {
      Serial.println("off");
      digitalWrite(Pump, LOW);
    }
  }
  if (String(topic) == "garden/fan") {
    Serial.print("Changing output to ");
    if (messageTemp == "off") {
      Serial.println("on");
      digitalWrite(Fan, HIGH);
    }
    else if (messageTemp == "on") {
      Serial.println("off");
      digitalWrite(Fan, LOW);
    }
  }
  if (String(topic) == "garden/mode") {
    Serial.print("Changing Room mode to ");
    if (messageTemp == "on") {
      modeState = "on";
      Serial.print("On");
    }
    else if (messageTemp == "off") {
      modeState = "off";
      Serial.print("Off");
    }
  }
  if (String(topic) == "garden/soi/number") {
    numbersoi = messageTemp.toInt();
    EEPROM.write(1, numbersoi);
    EEPROM.commit();
    Serial.println(numbersoi);
  }
  if (String(topic) == "garden/temp/number") {
    numbertemp = messageTemp.toInt();
    EEPROM.write(0, numbertemp);
    EEPROM.commit();
    Serial.println(numbertemp);
  }
  if (String(topic) == "garden/hum/number") {
    numberhum = messageTemp.toInt();
  }
  if (String(topic) == "garden/lig/number") {
    numberlight = messageTemp.toInt();
    EEPROM.write(2, numberlight);
    EEPROM.commit();
    Serial.println(numberlight);
  }
  if (String(topic) == "garden/update") {
    Serial.print("Changing Room mode to ");
    if (messageTemp == "esp") {
      Serial.print("cap nhat");
      t_httpUpdate_return ret = ESPhttpUpdate.update(serverUrl, currentVersion);
      switch (ret) {
        case HTTP_UPDATE_FAILED:
          Serial.printf("HTTP_UPDATE_FAILD Error (%d): %s", ESPhttpUpdate.getLastError(),
                        ESPhttpUpdate.getLastErrorString().c_str());
          break;
        case HTTP_UPDATE_NO_UPDATES:
          Serial.println("HTTP_UPDATE_NO_UPDATES");
          break;
        case HTTP_UPDATE_OK:
          Serial.println("HTTP_UPDATE_OK");
          break;
      }        client.disconnect();
    }
  }
  if (String(topic) == "garden/motor") {
    goc = messageTemp.toInt();
    goc = (goc * 1.4222222222);
    RunMotor();
    Serial.print("goc");
    Serial.println(goc);
  }
  if (String(topic) == "garden/timer/number") {
    nbtimer = messageTemp.toInt();
    EEPROM.write(3, nbtimer);
    Serial.println(nbtimer);
  }
  if (String(topic) == "garden/timer/number") {
    Serial.print("Changing Room mode to ");
    numberrain = messageTemp.toInt();
  }
}







void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("esp32Client")) {
      Serial.println("connected");
      // Subscribe
      client.subscribe("garden/lamp");
      client.subscribe("garden/fan");
      client.subscribe("garden/pump");
      client.subscribe("garden/mode");
      client.subscribe("garden/temp/number");
      client.subscribe("garden/hum/number");
      client.subscribe("garden/soi/number");
      client.subscribe("garden/lig/number");
      client.subscribe("garden/update");
      client.subscribe("garden/motor");
      client.subscribe("garden/timer/number");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

float t = 0;
float h = 0;
void Dht() {
  now = millis();
  if (now - lastMeasure > 3000) {
    lastMeasure = now;
    t = dht.readTemperature();
    h = dht.readHumidity();
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
    float hic = dht.computeHeatIndex(t, h, false);
    static char temperatureTemp[7];
    dtostrf(t, 6, 2, temperatureTemp);


    static char humidityTemp[7];
    dtostrf(h, 6, 2, humidityTemp);
    client.publish("garden/temperature", temperatureTemp);
    client.publish("garden/humidity", humidityTemp);




    //    Serial.print("Humidity: ");
    //    Serial.print(h);
    //    Serial.print(" %\t Temperature: ");
    //    Serial.print(t);
    //    Serial.print(" *C ");





    //  Serial.print("do am dung");
    //  Serial.println(setTemp);
    //  Serial.print("nhiet do");
    //  Serial.println(EEPROM.read(0));
    //  Serial.print("anh sang");
    //  Serial.println(EEPROM.read(2));

  }
}

int l;
void Light(void) {
  int readValue = 0;
  nowLight = millis();
  if (nowLight - lastLight > 3000) {
    lastLight = nowLight;
    for (int i = 0; i <= 9; i++) {
      readValue += analogRead(pinLight);
    }
    int value = readValue / 10;
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
void SoilMoisture(void) {
  int readValue = 0;
  nowSoilMoisture = millis();
  if (nowSoilMoisture - lastSoilMoisture > 3000) {
    lastSoilMoisture = nowSoilMoisture;
    for (int i = 0; i <= 9; i++) {
      readValue += analogRead(pinSoilMoisture);
    }
    int value = readValue / 10;
    s = map(value, 1100, 4095, 0, 100);
    s = 100 - s;
    static char soilmoisture[7];
    dtostrf(s, 6, 0, soilmoisture);
    client.publish("garden/soilmoisture", soilmoisture);
    //  Serial.print(s);
    //  Serial.println('%');
  }
}



int r = 0;
void Rain(void) {
  int readValue = 0;
  nowRain = millis();
  if (nowRain - lastRain > 3000) {
    lastRain = nowRain;
    for (int i = 0; i <= 9; i++) {
      readValue += analogRead(pinRain);
    }
    int value = readValue / 10;
    r = map(value, 1100, 4095, 0, 100);
    r = 100 - r;
    static char rain[7];
    dtostrf(r, 6, 0, rain);
    client.publish("garden/rain", rain);
    //  Serial.print(s);
    //  Serial.println('%');
  }
}


void Auto() {
  nowMode = millis();
  if (nowMode - lastMode > 3000) {
    lastMode = nowMode;
    //do am dat
    if (s < numbersoi) {
      digitalWrite(Pump, LOW);
      client.publish("garden/pump", "on");
    } else {
      digitalWrite(Pump, HIGH);
      client.publish("garden/pump", "off");
    }
    //nhiet do & do am
    //&& h > 80
    if (t > numbertemp) {
      digitalWrite(Fan, LOW);
      client.publish("garden/fan", "on");
    } else {
      digitalWrite(Fan, HIGH);
      client.publish("garden/fan", "off");
    }

    if (l < numberlight ) {
      digitalWrite(Lamp, LOW);
      client.publish("garden/lamp", "on");
    } else {
      digitalWrite(Lamp, HIGH);
      client.publish("garden/lamp", "off");
    }

    if (r > numberrain) {
      client.publish("garden/motor", "100");
      digitalWrite(27, HIGH);
      goc = 100;
      goc = (goc * 1.4222222222);
      RunMotor();
      
    } else {
      client.publish("garden/motor", "0");
      digitalWrite(27, LOW);
      goc = 0;
      goc = (goc * 1.4222222222);
      RunMotor();  
    }
  }
}





void RunMotor() {
  while (goc > goc_hientai) {
    left();
    goc_hientai = goc_hientai + 1;
  }
  while (goc < goc_hientai) {
    right();
    goc_hientai = goc_hientai - 1;
  }
  apagado();
}
unsigned long millis_1 = 0;
unsigned long millis_2 = 0;
unsigned long millis_3 = 0;
unsigned long millis_4 = 0;
void right() {
  digitalWrite(32, LOW);
  digitalWrite(33, LOW);
  digitalWrite(25, HIGH);
  digitalWrite(26, HIGH);
  delay(tocdo);
  digitalWrite(32, LOW);
  digitalWrite(33, HIGH);
  digitalWrite(25, HIGH);
  digitalWrite(26, LOW);
  delay(tocdo);
  digitalWrite(32, HIGH);
  digitalWrite(33, HIGH);
  digitalWrite(25, LOW);
  digitalWrite(26, LOW);
  Serial.println("3");
  delay(tocdo);
  digitalWrite(32, HIGH);
  digitalWrite(33, LOW);
  digitalWrite(25, LOW);
  digitalWrite(26, HIGH);
  Serial.println("3");
  delay(tocdo);
}

//motor quay sang trai
void left() {
  digitalWrite(32, HIGH);
  digitalWrite(33, HIGH);
  digitalWrite(25, LOW);
  digitalWrite(26, LOW);
  delay(tocdo);
  digitalWrite(32, LOW);
  digitalWrite(33, HIGH);
  digitalWrite(25, HIGH);
  digitalWrite(26, LOW);
  delay(tocdo);
  digitalWrite(32, LOW);
  digitalWrite(33, LOW);
  digitalWrite(25, HIGH);
  digitalWrite(26, HIGH);
  delay(tocdo);
  digitalWrite(32, HIGH);
  digitalWrite(33, LOW);
  digitalWrite(25, LOW);
  digitalWrite(26, HIGH);
  delay(tocdo);
}

void apagado() {
  digitalWrite(32, LOW);
  digitalWrite(33, LOW);
  digitalWrite(25, LOW);
  digitalWrite(26, LOW);
}


char Soi[50];
char Temp[50];
char Lightt[50];
void Number() {
  now = millis();
  if (now - lastMeasure > 3000) {
    String setSoi = String(EEPROM.read(1));
    setSoi.toCharArray(Soi, setSoi.length() + 1);

    String setTemp = String(EEPROM.read(0));
    setTemp.toCharArray(Temp, setTemp.length() + 1);

    String setLight = String(EEPROM.read(2));
    setLight.toCharArray(Lightt, setLight.length() + 1);
    //
    //    Serial.println(EEPROM.read(3));
    //    Serial.println(Temp);
    //    Serial.println(Lightt);


    client.publish("garden/temp/number", Temp);
    client.publish("garden/soi/number", Soi);
    client.publish("garden/lig/number", Lightt);
    //    client.publish("garden/lamp", soi);
    //  Serial.print("do am dung");
    //  Serial.println(EEPROM.read(1));
    //  Serial.print("nhiet do");
    //  Serial.println(EEPROM.read(0));
    //  Serial.print("anh sang");
    //  Serial.println(EEPROM.read(2));
    //  }
  }
}
long lasttimer = 0;

void timer() {
  if ( (unsigned long) (millis() - lasttimer) > (nbtimer * 1000))
  {
    // Thay đổi trạng thái đèn led
    if (digitalRead(Pump2) == LOW)
    {
      digitalWrite(Pump2, HIGH);
    } else {
      digitalWrite(Pump2, LOW);
    }
    lasttimer = millis();
  }
}



void loop() {
  Rain();
  Number();
  Dht();
  Light();
  SoilMoisture();
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  if (modeState == "on") {
    Auto();
  }
  if (nbtimer == 0) {
    digitalWrite(Pump2, HIGH);
  } else {
    timer();
  }
}
