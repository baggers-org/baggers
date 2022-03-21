@app
cron

@scheduled
update-symbols rate(7 days)
update-quotes rate(1 minute)

@aws
# profile default
runtime typescript
region eu-west-1
architecture arm64

@plugins
architect/plugin-typescript
