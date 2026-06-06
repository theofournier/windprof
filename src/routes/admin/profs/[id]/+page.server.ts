import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { profCertifications, profProfiles, reviews } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const prof = await locals.db.query.profProfiles.findFirst({
		where: eq(profProfiles.id, params.id),
		with: {
			user: true,
			sports: true,
			spots: { orderBy: (s, { asc }) => [asc(s.displayOrder)] },
			certifications: { orderBy: (c, { asc }) => [asc(c.createdAt)] },
			reviews: { orderBy: (r, { desc }) => [desc(r.createdAt)] }
		}
	});

	if (!prof) error(404, 'Moniteur introuvable');

	return { prof };
};

export const actions: Actions = {
	validateCert: async ({ request, locals }) => {
		const data = await request.formData();
		const certId = data.get('certId') as string;
		if (!certId) return fail(400, { error: 'certId manquant' });

		await locals.db
			.update(profCertifications)
			.set({ status: 'verified' })
			.where(eq(profCertifications.id, certId));

		return { success: true };
	},

	rejectCert: async ({ request, locals }) => {
		const data = await request.formData();
		const certId = data.get('certId') as string;
		if (!certId) return fail(400, { error: 'certId manquant' });

		await locals.db
			.update(profCertifications)
			.set({ status: 'rejected' })
			.where(eq(profCertifications.id, certId));

		return { success: true };
	},

	suspend: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		const reason = data.get('reason') as string;
		const durationDays = parseInt((data.get('durationDays') as string) ?? '0', 10);
		if (!userId) return fail(400, { error: 'userId manquant' });

		await locals.auth.api.banUser({
			body: {
				userId,
				banReason: reason || undefined,
				banExpiresIn: durationDays > 0 ? durationDays * 86400 : undefined
			},
			headers: request.headers
		});

		return { success: true };
	},

	unsuspend: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		if (!userId) return fail(400, { error: 'userId manquant' });

		await locals.auth.api.unbanUser({
			body: { userId },
			headers: request.headers
		});

		return { success: true };
	},

	toggleVerified: async ({ locals, params }) => {
		const prof = await locals.db.query.profProfiles.findFirst({
			where: eq(profProfiles.id, params.id)
		});
		if (!prof) return fail(404, { error: 'Moniteur introuvable' });

		await locals.db
			.update(profProfiles)
			.set({ isVerified: !prof.isVerified })
			.where(eq(profProfiles.id, params.id));

		return { success: true };
	},

	togglePublish: async ({ locals, params }) => {
		const prof = await locals.db.query.profProfiles.findFirst({
			where: eq(profProfiles.id, params.id)
		});
		if (!prof) return fail(404, { error: 'Moniteur introuvable' });

		await locals.db
			.update(profProfiles)
			.set({ isPublished: !prof.isPublished })
			.where(eq(profProfiles.id, params.id));

		return { success: true };
	},

	deleteAccount: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		if (!userId) return fail(400, { error: 'userId manquant' });

		await locals.auth.api.removeUser({
			body: { userId },
			headers: request.headers
		});

		redirect(303, '/admin/profs');
	},

	deleteReview: async ({ request, locals }) => {
		const data = await request.formData();
		const reviewId = data.get('reviewId') as string;
		if (!reviewId) return fail(400, { error: 'reviewId manquant' });

		await locals.db.delete(reviews).where(eq(reviews.id, reviewId));

		return { success: true };
	}
};
