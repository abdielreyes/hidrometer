#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// Define Trig and Echo pin:
#define trigPin 2
#define echoPin 4
#define sensorPin 5

// Define variables:
long duration;
int distance;
int flagValue;

//Conexión WiFi y MQTT
const char* ssid = "Megacable_2.4G_7970";
const char* password = "pLjq9NWi";
const char* mqttServer = "3.132.40.50";
const int mqttPort = 1883;
const char* mqttUser = "sensor1";
const char* mqttPassword = "n0m3l0";

WiFiClient espClient;
PubSubClient client(espClient);


void setup() {
    // Define entradas y salidas
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    pinMode(sensorPin, INPUT);

    //Conectarse al WiFi
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    Serial.println("...................................");
    Serial.print("Conectando al WiFi.");
    while (WiFi.status() != WL_CONNECTED) 
      {  delay(500);
        Serial.print(".") ;
      } 
    Serial.println("Conectado a el WiFi");

  //Conexión MQTT
    client.setServer(mqttServer, mqttPort); 
    while (!client.connected()) 
      {    Serial.println("Conectando a MQTT..."); 
          if (client.connect("ESP32Client", mqttUser, mqttPassword )) 
              Serial.println("connected");
          else 
              {   Serial.print("failed with state ");
                  Serial.print(client.state());
                  delay(2000);
              }
      }
 
}
 
void loop() {
  // Resetear el trigPin configurandolo como bajo
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);

 // Enviar la señal del sensor configurando el trigPin alto por 10 microsegundos:
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Leer el echoPin. pulseIn() regresa el tiempo de respuesta en microsegundos:
  duration = pulseIn(echoPin, HIGH);
  
  // Calcula la distancia, a partir del tiempo obtenido:
  distance = ((duration*0.034)/2);

  // Leer sensor contacto
  flagValue = digitalRead(sensorPin);

  //Función para crear el json con el que se mandarán los datos y los parametros a pasar
  StaticJsonDocument<256> doc;
  doc["sensorId"]=1;
  doc["data"]=distance;
  doc["flag"]=flagValue;
  
  //Serialización del json
  char out[128];
  int L=serializeJson(doc, out);

  //Envia el json al mqtt
  client.publish("hidrometer", out, L);

  //Muestra los datos que estamos enviando
  Serial.print(distance);
  Serial.print(" , ");
  Serial.println( flagValue );
  delay(500);
  client.loop();
}
