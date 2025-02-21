import React, { useState } from "react";
import { Button, Modal, Text, Image, Loader } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useDropzone } from "react-dropzone";
import dayjs from "dayjs";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset";
const CLOUDINARY_CLOUD_NAME = "your_cloud_name";

const ContentScheduler = ({
  onSchedule,
}: {
  onSchedule: (
    datetime: string,
    mediaUrl?: string,
    altText?: string,
    tags?: string[]
  ) => void;
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [altText, setAltText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  /** 🔹 Handle Image Upload to Cloudinary */
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    formData.append("auto_tagging", "0.7"); // AI Tagging
    formData.append("context", "alt=auto"); // AI Alt Text

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const { secure_url, context, tags: uploadedTags } = response.data;

      setImagePreview(secure_url);
      setAltText(context?.custom?.alt || "AI-generated description");
      setTags(uploadedTags || []);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  /** 🔹 Handle Scheduling */
  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      const scheduledTime = `${formattedDate} ${selectedTime}`;

      onSchedule(scheduledTime, imagePreview ?? undefined, altText, tags);
      setOpened(false);
    }
  };

  /** 🔹 Dropzone for File Upload */
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

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

          {/* Image Upload */}
          <div
            {...getRootProps()}
            className="w-3/4 p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center"
          >
            <input {...getInputProps()} />
            {uploading ? (
              <Loader color="blue" />
            ) : (
              <p className="text-gray-500">Upload an image</p>
            )}
          </div>

          {/* Preview Image */}
          {imagePreview && (
            <div className="w-full flex flex-col items-center">
              <Image
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
              <Text size="sm" className="text-gray-500 mt-2">
                {altText}
              </Text>
            </div>
          )}

          {/* Tags Display */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

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
