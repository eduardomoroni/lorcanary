"use client";

import * as React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for dropdowns
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "Brazil",
  "Japan",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Belgium",
  "Switzerland",
  "Austria",
  "Ireland",
  "Portugal",
  "Greece",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Slovakia",
  "Slovenia",
  "Croatia",
  "Bulgaria",
  "Romania",
  "Serbia",
  "Bosnia and Herzegovina",
  "Montenegro",
  "North Macedonia",
  "Albania",
  "Lithuania",
  "Latvia",
  "Estonia",
  "Ukraine",
  "Russia",
  "Turkey",
  "Israel",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Egypt",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Ethiopia",
  "Morocco",
  "Algeria",
  "Tunisia",
  "Libya",
  "Sudan",
  "China",
  "India",
  "Pakistan",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Bhutan",
  "Maldives",
  "Thailand",
  "Vietnam",
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Philippines",
  "South Korea",
  "North Korea",
  "Mongolia",
  "Kazakhstan",
  "Uzbekistan",
  "Turkmenistan",
  "Kyrgyzstan",
  "Tajikistan",
  "Afghanistan",
  "Iran",
  "Iraq",
  "Syria",
  "Lebanon",
  "Jordan",
  "Palestine",
  "Yemen",
  "Myanmar",
  "Laos",
  "Cambodia",
  "Brunei",
  "New Zealand",
  "Fiji",
  "Papua New Guinea",
  "Solomon Islands",
  "Vanuatu",
  "Samoa",
  "Tonga",
  "Micronesia",
  "Palau",
  "Marshall Islands",
  "Nauru",
  "Tuvalu",
];
const regions = ["americas", "europe", "asia", "earth"];

type Profile = {
  id: number;
  name: string | null;
  tier: number;
  region: string;
  country: string | null;
  userId: string | null;
  preferredColor: string | null;
  rankedMMR: number;
  currentDeckId: number | null;
};

export const ProfilePage: React.FC<{
  profile: Profile;
}> = (props) => {
  const [profile, setProfile] = useState(props.profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // Here you would typically send the updated profile to your backend
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            View and edit your profile information
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name || ""}
                onChange={handleInputChange}
              />
            </div>

            {/*<div className="space-y-2">*/}
            {/*  <Label htmlFor="tier">Tier</Label>*/}
            {/*  <Input*/}
            {/*    id="tier"*/}
            {/*    name="tier"*/}
            {/*    type="number"*/}
            {/*    value={profile.tier}*/}
            {/*    onChange={handleInputChange}*/}
            {/*  />*/}
            {/*</div>*/}

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                name="region"
                value={profile.region}
                onValueChange={(value) => handleSelectChange("region", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region.charAt(0).toUpperCase() + region.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/*<div className="space-y-2">*/}
            {/*  <Label htmlFor="country">Country</Label>*/}
            {/*  <Select*/}
            {/*    name="country"*/}
            {/*    value={profile.country}*/}
            {/*    onValueChange={(value) => handleSelectChange("country", value)}*/}
            {/*  >*/}
            {/*    <SelectTrigger>*/}
            {/*      <SelectValue placeholder="Select a country" />*/}
            {/*    </SelectTrigger>*/}
            {/*    <SelectContent>*/}
            {/*      {countries.map((country) => (*/}
            {/*        <SelectItem key={country} value={country}>*/}
            {/*          {country}*/}
            {/*        </SelectItem>*/}
            {/*      ))}*/}
            {/*    </SelectContent>*/}
            {/*  </Select>*/}
            {/*</div>*/}

            {/*<div className="space-y-2">*/}
            {/*  <Label htmlFor="preferredColor">Preferred Color</Label>*/}
            {/*  <Input*/}
            {/*    id="preferredColor"*/}
            {/*    name="preferredColor"*/}
            {/*    value={profile.preferredColor}*/}
            {/*    onChange={handleInputChange}*/}
            {/*  />*/}
            {/*</div>*/}

            {/*<div className="space-y-2">*/}
            {/*  <Label htmlFor="rankedMMR">Ranked MMR</Label>*/}
            {/*  <Input*/}
            {/*    id="rankedMMR"*/}
            {/*    name="rankedMMR"*/}
            {/*    type="number"*/}
            {/*    value={profile.rankedMMR}*/}
            {/*    onChange={handleInputChange}*/}
            {/*  />*/}
            {/*</div>*/}

            {/*<div className="space-y-2">*/}
            {/*  <Label htmlFor="currentDeckId">Current Deck ID</Label>*/}
            {/*  <Input*/}
            {/*    id="currentDeckId"*/}
            {/*    name="currentDeckId"*/}
            {/*    type="number"*/}
            {/*    value={profile.currentDeckId}*/}
            {/*    onChange={handleInputChange}*/}
            {/*  />*/}
            {/*</div>*/}
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
