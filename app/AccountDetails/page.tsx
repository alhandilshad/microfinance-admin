'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from '../components/Footer'
import Header from '../components/Header' 
import MyAccountBanner from '../components/myAccountBanner'
import MyAccountSidebar from '../components/MyAccountSidebar'
import { useCart } from '../context/Context'

export default function AccountDetails() {
  const { user } = useCart();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div>
      <Header/>
      <MyAccountBanner/>
      <div className="container flex md:flex-row flex-col justify-start md:gap-20 gap-5 mx-auto py-10 md:py-20">
        <div className="md:w-96 w-full p-4">
            <MyAccountSidebar/>
        </div>
        <div className="md:w-3/5 w-full mx-auto  p-4">
        <Card className="max-w-2xl mx-auto border shadow-none font-montserratRegular">
        <CardHeader>
          <CardTitle className='font-montserratSemiBold text-xl'>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name *</Label>
              <Input value={user?.name?.split(' ')[0]} id="firstName" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name *</Label>
              <Input value={user?.name?.split(' ')[1]} id="lastName" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="displayName">Display name *</Label>
              <Input value={user?.name} id="displayName" defaultValue="tester" required />
              <p className="text-sm text-muted-foreground">
                This will be how your name will be displayed in the account section and in reviews
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email address *</Label>
              <Input value={user?.email} id="email" type="email" defaultValue="tester@gmail.com" required />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">PASSWORD CHANGE</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current password (leave blank to leave unchanged)</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword">New password (leave blank to leave unchanged)</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Save changes
            </Button>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
      <Footer/>
    </div>
  )
}