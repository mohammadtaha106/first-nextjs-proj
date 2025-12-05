"use client";
import React from 'react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="border-t border-border pt-6"></div>

      <div className="max-w-xl">
        <form className="space-y-8" onSubmit={(e) => {
          e.preventDefault();
          console.log('Settings submitted');
        }}>
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                defaultValue="Default User"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your name"
            />
            <p className="text-[0.8rem] text-muted-foreground">This is your public display name.</p>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                defaultValue="user@example.com"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your email"
            />
             <p className="text-[0.8rem] text-muted-foreground">You can manage verified email addresses in your email settings.</p>
          </div>

          {/* Theme Toggle (Dummy Checkbox) */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <label htmlFor="theme-toggle" className="text-base font-medium">Dark Mode</label>
                <p className="text-[0.8rem] text-muted-foreground">Enable dark mode for a better viewing experience at night.</p>
            </div>
            <div className="flex items-center">
                 <input type="checkbox" id="theme-toggle" className="peer sr-only" />
                 <label htmlFor="theme-toggle" className="cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-checked:bg-primary">
                    <span className="sr-only">Enable dark mode</span>
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-background transition-transform peer-checked:translate-x-6" />
                 </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;