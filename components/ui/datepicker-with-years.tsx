"use client";

import * as React from "react";
import { format, setYear, getYear, setHours, setMinutes } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  yearsRange?: number;
  placeholder?: string;
  className?: string;
  disableFuture?: boolean;
  showTime?: boolean;
}

export function DatePickerWithYears({
  date,
  onDateChange,
  yearsRange = 150,
  placeholder = "Pick a date",
  className,
  disableFuture,
  showTime = false,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date ?? new Date()
  );
  const [selectedYear, setSelectedYear] = React.useState<number>(
    getYear(date ?? new Date())
  );
  const [selectedHour, setSelectedHour] = React.useState<number>(
    date ? date.getHours() : new Date().getHours()
  );
  const [selectedMinute, setSelectedMinute] = React.useState<number>(
    date ? date.getMinutes() : new Date().getMinutes()
  );

  // Sync with external date prop
  React.useEffect(() => {
    if (date) {
      setSelectedDate(date);
      setSelectedYear(getYear(date));
      setSelectedHour(date.getHours());
      setSelectedMinute(date.getMinutes());
    }
  }, [date]);

  // Generate a list of years (e.g., 2025 to 150 years back)
  const years = Array.from(
    { length: yearsRange },
    (_, i) => new Date().getFullYear() - i
  );

  // Generate hours (0-23) and minutes (0-59)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Update year
  const handleYearChange = (year: number) => {
    const newDate = selectedDate
      ? setYear(selectedDate, year)
      : setYear(new Date(), year);
    setSelectedDate(newDate);
    setSelectedYear(year);
    onDateChange(newDate);
  };

  // Update time
  const handleTimeChange = (hour: number, minute: number) => {
    if (!selectedDate) return;
    const newDate = setMinutes(setHours(selectedDate, hour), minute);
    setSelectedDate(newDate);
    setSelectedHour(hour);
    setSelectedMinute(minute);
    onDateChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2" />
          {selectedDate ? (
            format(selectedDate, showTime ? "PPP p" : "PPP") // Show time if enabled
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        {/* Year Selection Dropdown */}
        <Select onValueChange={(value) => handleYearChange(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder={`${selectedYear}`} />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-60 overflow-auto">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Calendar Component */}
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(newDate) => {
              if (!newDate) return;
              const updatedDate = setMinutes(
                setHours(newDate, selectedHour),
                selectedMinute
              );
              setSelectedDate(updatedDate);
              setSelectedYear(getYear(updatedDate));
              onDateChange(updatedDate);
            }}
            initialFocus
          />
        </div>

        {/* Time Selection (Only if showTime is enabled) */}
        {showTime && (
          <div className="flex space-x-2 items-center">
            <ClockIcon className="mr-2 h-5 w-5 text-muted-foreground" />
            {/* Hour Select */}
            <Select
              onValueChange={(value) =>
                handleTimeChange(parseInt(value), selectedMinute)
              }
              value={selectedHour.toString()}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent position="popper">
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span>:</span>

            {/* Minute Select */}
            <Select
              onValueChange={(value) =>
                handleTimeChange(selectedHour, parseInt(value))
              }
              value={selectedMinute.toString()}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent position="popper">
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute.toString()}>
                    {minute.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
