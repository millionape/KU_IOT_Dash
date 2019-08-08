from socket import *
from time import ctime
import time
import json
from random import seed
from random import randint

HOST = '119.59.125.170'
PORT = 2888
BUFSIZE = 128
ADDR = (HOST,PORT)

udpCliSock = socket(AF_INET,SOCK_DGRAM)

json_data = '{"id":"31","airTemp":"70","airHumid":"10","pm1":"30","pm25":"200","pm10":"100","rain":"0","uv":"0.40","soilHumid":"80","wind":"20","gid":"83"}'
python_obj = json.loads(json_data)
while True:
    try:
        python_obj["airTemp"] = str(randint(30, 50))
        python_obj["airHumid"] = str(randint(70, 80))
        python_obj["pm1"] = str(randint(50, 80))
        python_obj["pm25"] = str(randint(50, 80))
        python_obj["pm10"] = str(randint(50, 80))
        python_obj["rain"] = str(randint(0, 1))
        python_obj["wind"] = str(randint(10, 25))
        python_obj["soilHumid"] = str(randint(20, 80))
        python_obj["uv"] = str(randint(0, 3))
        x = json.dumps(python_obj)
        udpCliSock.sendto(x,ADDR) 
        print('sent : ', x)
        print "...waiting for response..."
        udpCliSock.settimeout(1)
        recv_data,ADDR = udpCliSock.recvfrom(BUFSIZE)
        if recv_data is not None:
            print "[%s]: receiving data from server %s:%s  :%s" %(ctime(),ADDR[0],ADDR[1],recv_data)
        time.sleep(1.3)
    except timeout:
        print("timeout!!!!!!!!!!")
        udpCliSock.sendto('\n\r',ADDR) 
        udpCliSock.sendto('\n\r',ADDR)
        #udpCliSock.close()