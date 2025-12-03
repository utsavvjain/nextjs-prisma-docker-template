# Deployment Checklist

Use this checklist before deploying your TodoList application to production.

## Pre-Deployment Checklist

### 1. Environment Configuration

- [ ] Copy `.env.example` to `.env`
- [ ] Set production `DATABASE_URL` in environment
- [ ] Verify `NODE_ENV=production`
- [ ] Remove any hardcoded secrets or API keys
- [ ] Test database connection

### 2. Database Setup

- [ ] Run `npm run db:generate` to generate Prisma Client
- [ ] Run `npm run db:push` or `npm run db:migrate` to create tables
- [ ] Verify database schema is correct
- [ ] Test database connectivity from production environment
- [ ] Set up database backups

### 3. Dependencies

- [ ] Run `npm install` to install all dependencies
- [ ] Verify no security vulnerabilities with `npm audit`
- [ ] Update any critical security patches
- [ ] Lock dependency versions for production

### 4. Build & Testing

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run start`
- [ ] Verify all pages load correctly
- [ ] Test all API endpoints
- [ ] Test task CRUD operations
- [ ] Test filter functionality
- [ ] Verify dark mode works
- [ ] Test responsive design on mobile

### 5. Performance

- [ ] Check Lighthouse scores (aim for 90+)
- [ ] Verify Core Web Vitals
- [ ] Test with 100+ tasks for performance
- [ ] Check bundle size
- [ ] Verify images are optimized
- [ ] Test loading times

### 6. Security

- [ ] Environment variables are not committed
- [ ] Database credentials are secure
- [ ] SQL injection prevention verified (Prisma ORM handles this)
- [ ] Input validation with Zod is working
- [ ] CORS is properly configured
- [ ] Rate limiting considered (if needed)

### 7. Accessibility

- [ ] Run axe DevTools accessibility audit
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify ARIA labels
- [ ] Check color contrast ratios
- [ ] Test focus indicators

### 8. Browser Compatibility

- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile browsers
- [ ] Test dark mode on all browsers

### 9. Error Handling

- [ ] Test with invalid inputs
- [ ] Test network failure scenarios
- [ ] Verify error messages are user-friendly
- [ ] Test database connection failures
- [ ] Check error logging

### 10. Documentation

- [ ] README.md is complete
- [ ] QUICKSTART.md is accurate
- [ ] API endpoints are documented
- [ ] Environment variables are documented
- [ ] Deployment steps are clear

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Configure Vercel**
   - Import project from GitHub
   - Add environment variable: `DATABASE_URL`
   - Set framework preset: Next.js
   - Configure build command: `npm run build`
   - Configure output directory: `.next`

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit deployment URL
   - Test functionality

4. **Post-Deployment**
   - Run database migrations if needed
   - Test all features in production
   - Monitor error logs

### Option 2: Docker Deployment

1. **Build Docker Image**
   ```bash
   docker build -t todolist:latest .
   ```

2. **Run Container**
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e DATABASE_URL="your-production-db-url" \
     -e NODE_ENV="production" \
     --name todolist \
     todolist:latest
   ```

3. **Verify**
   ```bash
   docker logs todolist
   curl http://localhost:3000/api/tasks/stats
   ```

### Option 3: Traditional VPS

1. **Install Dependencies on Server**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs mysql-server
   ```

2. **Clone and Setup**
   ```bash
   git clone <your-repo>
   cd todolist
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Use Process Manager**
   ```bash
   npm install -g pm2
   pm2 start npm --name "todolist" -- start
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment Verification

### Smoke Tests

- [ ] Homepage loads
- [ ] Can create a task
- [ ] Can edit a task
- [ ] Can delete a task
- [ ] Can toggle task completion
- [ ] Can filter tasks
- [ ] Can clear completed tasks
- [ ] Dark mode works
- [ ] About page loads
- [ ] Mobile layout works

### API Tests

```bash
# Test task creation
curl -X POST http://your-domain/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task"}'

# Test task listing
curl http://your-domain/api/tasks

# Test statistics
curl http://your-domain/api/tasks/stats
```

### Performance Tests

- [ ] Page load time < 2 seconds
- [ ] API response time < 200ms
- [ ] Database queries optimized
- [ ] No memory leaks

## Monitoring Setup

### Recommended Tools

1. **Error Tracking**
   - Sentry
   - LogRocket
   - Bugsnag

2. **Performance Monitoring**
   - Vercel Analytics
   - Google Analytics
   - New Relic

3. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

4. **Database Monitoring**
   - MySQL Enterprise Monitor
   - Datadog
   - Prometheus

### Health Checks

Create a health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
}
```

## Rollback Plan

If deployment fails:

1. **Identify Issue**
   - Check error logs
   - Review recent changes
   - Test locally

2. **Quick Rollback**
   - Vercel: Use "Redeploy" on previous deployment
   - Docker: `docker run` previous image tag
   - Git: `git revert` and redeploy

3. **Database Rollback** (if needed)
   - Restore from backup
   - Run down migrations

## Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Review user feedback
- [ ] Backup database regularly

### Scaling Considerations

When traffic grows:

1. **Database**
   - Add indexes
   - Enable connection pooling
   - Consider read replicas

2. **Application**
   - Enable caching
   - Use CDN for static assets
   - Scale horizontally

3. **Monitoring**
   - Set up alerts
   - Track key metrics
   - Monitor costs

## Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (18+)
- Clear `.next` and `node_modules`
- Verify all dependencies installed

**Database Connection Issues**
- Verify DATABASE_URL format
- Check database is running
- Verify network access
- Test connection string

**Performance Issues**
- Check database indexes
- Review Prisma queries
- Enable caching
- Optimize images

**CORS Errors**
- Configure Next.js API routes
- Set proper headers
- Verify domain configuration

## Success Criteria

Deployment is successful when:

✅ All pages load without errors
✅ All API endpoints respond correctly
✅ Database operations work
✅ Dark mode toggles properly
✅ Responsive design works on mobile
✅ No console errors
✅ Performance metrics are good
✅ Error monitoring is active
✅ Backups are configured

## Support

For deployment issues:
1. Check logs first
2. Review this checklist
3. Consult platform documentation
4. Open GitHub issue if needed

---

**Last Updated**: 2024
**Version**: 1.0.0
