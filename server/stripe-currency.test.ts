import { describe, it, expect } from 'vitest';

describe('Stripe Currency Configuration', () => {
  it('should use ILS currency in stripe router', async () => {
    const stripeRouterContent = await import('fs').then(fs => 
      fs.promises.readFile('/home/ubuntu/thai_course/server/stripeRouter.ts', 'utf-8')
    );
    
    // Check that currency is set to "ils" not "thb"
    expect(stripeRouterContent).toContain('currency: "ils"');
    expect(stripeRouterContent).not.toContain('currency: "thb"');
  });

  it('should use ILS as default currency in webhook handler', async () => {
    const webhookContent = await import('fs').then(fs => 
      fs.promises.readFile('/home/ubuntu/thai_course/server/webhookHandler.ts', 'utf-8')
    );
    
    // Check default currency is "ils"
    expect(webhookContent).toContain('|| "ils"');
    expect(webhookContent).not.toContain('|| "thb"');
  });

  it('should display shekel symbol (₪) in admin page', async () => {
    const adminContent = await import('fs').then(fs => 
      fs.promises.readFile('/home/ubuntu/thai_course/client/src/pages/Admin.tsx', 'utf-8')
    );
    
    // Check for shekel symbol
    expect(adminContent).toContain('₪');
    expect(adminContent).not.toContain('฿');
  });

  it('should display shekel symbol (₪) in profile page', async () => {
    const profileContent = await import('fs').then(fs => 
      fs.promises.readFile('/home/ubuntu/thai_course/client/src/pages/Profile.tsx', 'utf-8')
    );
    
    // Check for shekel symbol
    expect(profileContent).toContain('₪');
  });
});
