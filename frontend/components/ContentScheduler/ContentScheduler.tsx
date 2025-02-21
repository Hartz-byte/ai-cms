import React, { useState } from "react";
import { Button, Modal, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";

const ContentScheduler = ({
  onSchedule,
}: {
  onSchedule: (datetime: string) => void;
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      const scheduledTime = `${formattedDate} ${selectedTime}`;
      onSchedule(scheduledTime);
      setOpened(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-darkCard shadow-modern rounded-xl">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        📅 Content Scheduler
      </h3>

      <Button
        onClick={() => setOpened(true)}
        color="blue"
        className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300"
      >
        Schedule Post
      </Button>

      {/* Styled Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        portalProps={{ target: "body" }}
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 5,
        }}
        size="sm"
      >
        {/* Centered Title */}
        <Text
          size="xl"
          className="text-black text-center w-full block font-semibold"
        >
          Schedule Your Post 📝
        </Text>

        {/* Centered Form */}
        <div className="flex flex-col items-center mt-4 space-y-4">
          <Text size="sm" className="text-gray-500 text-center">
            Choose a date and time for your scheduled post.
          </Text>

          {/* Date Picker */}
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            className="text-black"
          />

          {/* Time Input */}
          <TimeInput
            value={selectedTime}
            onChange={(event) => setSelectedTime(event.currentTarget.value)}
            label="Select Time"
            className="w-2/3 text-black"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 w-full mt-4">
            <Button
              variant="outline"
              color="gray"
              onClick={() => setOpened(false)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleSchedule}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-all duration-300"
            >
              Confirm Schedule
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContentScheduler;
