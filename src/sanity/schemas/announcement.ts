import { defineField, defineType } from 'sanity';

export const announcementSchema = defineType({
  name: 'announcement',
  title: 'Announcement & Pop-up Alert',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Activate Announcement',
      type: 'boolean',
      description: 'Master toggle to enable or disable the announcement across the website.',
      initialValue: true,
    }),
    defineField({
      name: 'badge',
      title: 'Announcement Badge / Tag',
      type: 'string',
      description: 'e.g. EXCLUSIVE OFFER, SPECIAL NOTICE, EVENT ALERT',
      initialValue: 'EXCLUSIVE OFFER',
    }),
    defineField({
      name: 'title',
      title: 'Announcement Headline',
      type: 'string',
      description: 'Main heading displayed in the pop-up and banner.',
      initialValue: 'Special Membership Privilege — Limited Slots Available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Announcement Message',
      type: 'text',
      rows: 3,
      description: 'Detailed description of the offer, news, or update.',
      initialValue:
        'Enroll today at VST Fitness World and receive a complimentary 1-on-1 Physique Assessment & Science-Based Nutrition Periodization blueprint with our Master Coaches.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Button Text',
      type: 'string',
      description: 'e.g. Claim Your Privilege, Enroll Now, View Plans',
      initialValue: 'Claim Your Privilege',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link Target',
      type: 'string',
      description: 'Section anchor (e.g. #contact, #pricing) or external URL.',
      initialValue: '#contact',
    }),
    defineField({
      name: 'showBanner',
      title: 'Show Banner Section Under Hero',
      type: 'boolean',
      description: 'Display an eye-catching announcement section directly beneath the Hero section.',
      initialValue: true,
    }),
    defineField({
      name: 'showPopup',
      title: 'Show Pop-up Modal on Site Open',
      type: 'boolean',
      description: 'Automatically trigger an announcement modal pop-up when visitors open the site.',
      initialValue: true,
    }),
    defineField({
      name: 'popupFrequency',
      title: 'Pop-up Frequency',
      type: 'string',
      description: 'Controls how often visitors see the pop-up on page open.',
      options: {
        list: [
          { title: 'Once Per Session (Recommended)', value: 'session' },
          { title: 'Every Page Open / Reload', value: 'always' },
        ],
        layout: 'radio',
      },
      initialValue: 'session',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      badge: 'badge',
    },
    prepare({ title, isActive, badge }: any) {
      return {
        title: `${isActive ? '🟢 Active' : '⚪ Inactive'}: ${title || 'Untitled Announcement'}`,
        subtitle: badge ? `[${badge}]` : 'Website Announcement & Pop-up',
      };
    },
  },
});

