#!/bin/bash
cd /root/graduation_project/homework/homework
pids=`ps aux|grep -v 'grep'|grep 'manage.py runserver 0.0.0.0:80'|awk '{print $2}'`
if [ -n "$pids" ];then
	kill -9 ${pids}
fi
nohup python2.7 manage.py runserver 0.0.0.0:80 > nohup.out 2>&1 &
