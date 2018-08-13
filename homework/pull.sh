#!/bin/bash
cd /root/graduation_project/homework/homework
#git status
git stash
if [ $? -eq 0 ];then
	git pull
fi
