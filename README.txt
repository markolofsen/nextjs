# NODEJS INSTALLATION
sudo npm cache clean -f
sudo npm install -g n
sudo n 9.5.0

sudo npm install npm@latest -g



# MYSQL MIGRATIONS FROM SQLITE3 INSTRUCTION ===================================

# https://forum.vestacp.com/viewtopic.php?f=32&t=10306
# https://coderwall.com/p/mvsoyg/django-dumpdata-and-loaddata
# https://tproger.ru/articles/django-sqlite-to-mysql/
sudo apt-get install libmysqlclient-dev
sudo pip3 install mysqlclient

Create Mysql DB generail_ci utf8
Remove /Library/Application Support/appsolute/MAMP PRO/db: ib_logfile0 & ib_logfile1

Mysql DP config:
  'OPTIONS': {
    'sql_mode': 'traditional',
    'init_command': "SET storage_engine=MyISAM, sql_mode='STRICT_TRANS_TABLES', character_set_connection=utf8, collation_connection=utf8_unicode_ci",
    'autocommit': True,
  },

Make dump:
  python3 ./manage.py dumpdata > dump.json

Apply migrations to new DB:
  python3 manage.py migrate --run-syncdb

Remove ContentType from new DB:
  from django.contrib.contenttypes.models import ContentType
  ContentType.objects.all().delete()
  quit()

Load dump to new db:
  python3 ./manage.py loaddata dump.json
