Write-Host "🚀 Starting Deployment to SnapMarket VPS..." -ForegroundColor Cyan

$VPS_IP = "135.125.9.81"
$VPS_PORT = "20064"
$VPS_USER = "root"

Write-Host "📦 Archiving the codebase..." -ForegroundColor Yellow
# Ignore node_modules, .next, and dist to make the transfer fast
tar.exe -cf deploy.tar --exclude="node_modules" --exclude=".next" --exclude="dist" --exclude=".git" backend frontend docker-compose.yml nginx.conf

Write-Host "📤 Uploading archive to VPS (You will be prompted for your SSH password)..." -ForegroundColor Yellow
scp -P $VPS_PORT deploy.tar ${VPS_USER}@${VPS_IP}:/root/deploy.tar

Write-Host "🏗️ Extracting and building Docker containers on VPS (You will be prompted again)..." -ForegroundColor Yellow
ssh -p $VPS_PORT ${VPS_USER}@${VPS_IP} "cd /root && tar -xf deploy.tar && rm deploy.tar && docker compose up --build -d"

Write-Host "✅ Deployment initiated successfully!" -ForegroundColor Green
Write-Host "You can check the status on the VPS by running: ssh root@135.125.9.81 -p 20064 'docker compose logs -f'" -ForegroundColor Gray
