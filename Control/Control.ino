#include <ESP8266WiFi.h>
#include <PubSubClient.h>


const char* ssid = "Don";
const char* password = "11111111";
const char* mqtt_server = "172.20.10.5";

//const char* ssid = "Vulpes lagopus";
//const char* password = "01247793939";
//const char* mqtt_server = "192.168.1.11";

const int  btnLamp = 12;
int btnLampState;
int btnLastLampState = LOW;
unsigned long lastDebounceTimeLamp = 0;  // thoi gian cuoi nhan btn 
unsigned long debounceDelayLamp = 50;    // thoi gian de tre de nhan biet btn da nhan


const int  btnPump = 14;
int btnPumpState;
int btnLastPumpState = LOW;
unsigned long lastDebounceTimePump = 0;  // thoi gian cuoi nhan btn 
unsigned long debounceDelayPump = 50;    // thoi gian de tre de nhan biet btn da nhan

const int  btnFan = 13;
int btnFanState;
int btnLastFanState = LOW;
unsigned long lastDebounceTimeFan = 0;  // thoi gian cuoi nhan btn 
unsigned long debounceDelayFan = 50;    // thoi gian de tre de nhan biet btn da nhan


const int  btnMode = 15;
int btnModeState;
int btnLastModeState = LOW;
unsigned long lastDebounceTimeMode = 0;  // thoi gian cuoi nhan btn 
unsigned long debounceDelayMode = 50;    // thoi gian de tre de nhan biet btn da nhan


int countLamp=0;
int countPump=0;
int countFan=0;
int countMode=0;

WiFiClient espClient;
PubSubClient client(espClient);
int lampState = 1;
long nowLamp = millis();
long lastLamp = 0;

int fanState = 1;
long nowFan = millis();
long lastFan = 0;

int pumpState = 1;
long nowPump = millis();
long lastPump = 0;

int modeState = 1;
long nowMode = millis();
long lastMode = 0;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected - ESP IP address: ");
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
  if(String(topic)=="garden/lamp"){
      Serial.print("Changing Room mode to ");
      if(messageTemp == "on"){
        countLamp = 0;
        Serial.print("On");
        Serial.print(countLamp);
      }
      else if(messageTemp == "off"){
        countLamp = 1;
        Serial.print("Off");
        Serial.print(countLamp);
      }
  }


  if(String(topic)=="garden/fan"){
      Serial.print("Changing Room mode to ");
      if(messageTemp == "on"){
        countFan = 0;
        Serial.print("On");
        Serial.print(countFan);
      }
      else if(messageTemp == "off"){
        countFan = 1;
        Serial.print("Off");
        Serial.print(countFan);
      }
  }



  if(String(topic)=="garden/pump"){
      Serial.print("Changing Room mode to ");
      if(messageTemp == "on"){
        countPump = 0;
        Serial.print("On");
        Serial.print(countPump);
      }
      else if(messageTemp == "off"){
        countPump = 1;
        Serial.print("Off");
        Serial.print(countPump);
      }
  }

  if(String(topic)=="garden/mode"){
      Serial.print("Changing Room mode to ");
      if(messageTemp == "on"){
        countMode = 0;
        Serial.print("On");
        Serial.print(countMode);
        digitalWrite(LED_BUILTIN, LOW);
      }
      else if(messageTemp == "off"){
        countMode = 1;
        Serial.print("Off");
        Serial.print(countMode);
        digitalWrite(LED_BUILTIN, HIGH);
      }
  }
  
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    /*
     YOU MIGHT NEED TO CHANGE THIS LINE, IF YOU'RE HAVING PROBLEMS WITH MQTT MULTIPLE CONNECTIONS
     To change the ESP device ID, you will have to give a new name to the ESP8266.
     Here's how it looks:
       if (client.connect("ESP8266Client")) {
     You can do it like this:
       if (client.connect("ESP1_Office")) {
     Then, for the other ESP:
       if (client.connect("ESP2_Garage")) {
      That should solve your MQTT multiple connections problem
    */
    if (client.connect("ESP8266Client2")) {
      Serial.println("connected");  
      // Subscribe or resubscribe to a topic
      // You can subscribe to more topics (to control more LEDs in this example)
      client.subscribe("garden/lamp");
      client.subscribe("garden/pump");
      client.subscribe("garden/fan");            
      client.subscribe("garden/mode");      
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void Btn(){  
  int readLamp = digitalRead(btnLamp);
  if (readLamp != btnLastLampState) {
    lastDebounceTimeLamp = millis();
  }
  if ((millis() - lastDebounceTimeLamp) > debounceDelayLamp) {
    if (readLamp != btnLampState) {
      btnLampState = readLamp;
      if ((btnLampState == HIGH)) {
        countLamp++;
        if (countLamp %2 == 0) {
          client.publish("garden/lamp", "on");
          Serial.println("Publishing on topic garden/Lamp topic at QoS 0");
          Serial.println(countLamp);
        }
        else{
          client.publish("garden/lamp", "off");
          Serial.println("Publishing on topic garden/Lamp topic at QoS 0");
          Serial.println(countLamp);
        }
      }
    }
  }

  int readFan = digitalRead(btnFan);
  if (readFan != btnLastFanState) {
    lastDebounceTimeFan = millis();
  }
  if ((millis() - lastDebounceTimeFan) > debounceDelayFan) {
    if (readFan != btnFanState) {
      btnFanState = readFan;
      if ((btnFanState == HIGH)) {
        countFan++;
        if (countFan %2 == 0) {
          client.publish("garden/fan", "on");
          Serial.println("Publishing on topic garden/fan topic at QoS 0");
          Serial.println(countFan);
        }
        else{
          client.publish("garden/fan", "off");
          Serial.println("Publishing on topic garden/fan topic at QoS 0");
          Serial.println(countFan);
        }
      }
    }
  }  

  int readPump = digitalRead(btnPump);
  if (readPump != btnLastPumpState) {
    lastDebounceTimePump = millis();
  }
  if ((millis() - lastDebounceTimePump) > debounceDelayPump) {
    if (readPump != btnPumpState) {
      btnPumpState = readPump;
      if ((btnPumpState == HIGH)) {
        countPump++;
        if (countPump %2 == 0) {
          client.publish("garden/pump", "on");
          Serial.println("Publishing on topic garden/pump topic at QoS 0");
          Serial.println(countPump);
        }
        else{
          client.publish("garden/pump", "off");
          Serial.println("Publishing on topic garden/pump topic at QoS 0");
          Serial.println(countPump);
        }
      }
    }
  }



  int readMode = digitalRead(btnMode);
  if (readMode != btnLastModeState) {
    lastDebounceTimeMode = millis();
  }
  if ((millis() - lastDebounceTimeMode) > debounceDelayMode) {
    if (readMode != btnModeState) {
      btnModeState = readMode;
      if ((btnModeState == HIGH)) {
        countMode++;
        if (countMode %2 == 0) {
          client.publish("garden/mode", "on");
          digitalWrite(LED_BUILTIN, HIGH);
          Serial.println("Publishing on topic garden/pump topic at QoS 0");
          Serial.println(countMode);
        }
        else{
          client.publish("garden/mode", "off");
          digitalWrite(LED_BUILTIN, LOW);          
          Serial.println("Publishing on topic garden/pump topic at QoS 0");
          Serial.println(countMode);
        }
      }
    }
  }


  
  btnLastLampState = readLamp; 
  btnLastFanState = readFan;
  btnLastPumpState = readPump;    
  btnLastModeState = readMode;        
}


void setup() {
  pinMode(btnLamp, INPUT); // Cài đặt button là INPUT
  pinMode(btnPump, INPUT); // Cài đặt button là INPUT
  pinMode(btnFan, INPUT); // Cài đặt button là INPUT
  pinMode(btnMode, INPUT); // Cài đặt button là INPUT
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client2");
  Btn();
}
