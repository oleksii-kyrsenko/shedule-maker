const { Router } = require('express');
const router = Router();
const { Types } = require('mongoose');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Group = require('../../models/group');
const Student = require('../../models/student');
const Instructor = require('../../models/instructor');

// @route    POST api/groups
// @desc     Create group
// @access   Private

router.post(
	'/',
	[
		auth,
		[
			check('number', 'Group number is required').not().isEmpty(),
			check('start', 'Start date is required').not().isEmpty(),
			check('end', 'End date is required').not().isEmpty(),
			check('category', 'Category is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { number, start, end, category } = req.body;

		try {
			let group = await Group.findOne({
				user: req.user.id,
				number: req.body.number,
			});

			if (group) {
				return res.status(400).json({ errors: [{ msg: 'Group with same number already exists' }] });
			}

			group = new Group({
				user: req.user.id,
				number: number.trim(),
				start,
				end,
				category: category.toUpperCase().trim(),
			});

			await group.save();
			res.json({ group, success: [{ msg: 'Group created succesful' }] });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Server Error' }],
			});
		}
	}
);

// @route    PUT api/groups/:id
// @desc     Edit group
// @access   Private

router.put(
	'/:id',
	[
		auth,
		[
			check('number', 'Group number is required').not().isEmpty(),
			check('start', 'Start date is required').not().isEmpty(),
			check('end', 'End date is required').not().isEmpty(),
			check('category', 'Category is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { number, start, end, category } = req.body;

		const groupFields = {};

		if (number) {
			groupFields.number = number.trim();
		}
		if (start) {
			groupFields.start = start;
		}
		if (end) {
			groupFields.end = end;
		}
		if (category) {
			groupFields.category = category.toUpperCase().trim();
		}

		try {
			group = await Group.findOne({
				user: req.user.id,
				_id: req.params.id,
			});

			if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !group) {
				return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
			}

			if (number !== group.number) {
				group = await Group.findOne({
					user: req.user.id,
					number,
				});
				if (group) {
					return res
						.status(400)
						.json({ errors: [{ msg: 'Group with same number already exists' }] });
				}
			}

			group = await Group.findOneAndUpdate(
				{ user: req.user.id, _id: req.params.id },
				{
					$set: {
						...groupFields,
					},
				},
				{ new: true }
			);

			await group.save();
			res.json({ group, success: [{ msg: 'Group updated succesful' }] });
		} catch (error) {
			console.error(error.message);

			if (error.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
			}

			res.status(500).json({
				errors: [{ msg: 'Server Error' }],
			});
		}
	}
);

// @route    GET api/groups
// @desc     Get all groups of current user
// @access   Private

router.get('/', auth, async (req, res) => {
	try {
		const groups = await Group.find({
			user: req.user.id,
		})
			.sort({ date: -1 })
			.populate('user', ['name'])
			.populate('students');

		if (!groups.length) {
			return res.status(404).json({
				errors: [
					{
						msg: 'There are no groups for this company',
					},
				],
			});
		}

		res.json(groups);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			errors: [{ msg: 'Server Error' }],
		});
	}
});

// @route    GET api/groups/:id
// @desc     Get group by ID
// @access   Private

router.get('/:id', auth, async (req, res) => {
	try {
		const group = await Group.findOne({
			user: req.user.id,
			_id: req.params.id,
		})
			.populate('user', ['name'])
			.populate('students')
			.populate('instructors')

		// Check for ObjectId format and group
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !group) {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}

		res.json(group);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}
		res.status(500).json({
			errors: [{ msg: 'Server Error' }],
		});
	}
});

// @route    DELETE api/groups/:id
// @desc     Delete group by ID
// @access   Private

router.delete('/:id', auth, async (req, res) => {
	try {
		const group = await Group.findOne({
			user: req.user.id,
			_id: req.params.id,
		});

		// Check for ObjectId format and group
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !group) {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}

		await group.remove();
		res.json({ success: [{ msg: 'Group removed successful' }] });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}
		res.status(500).json({
			errors: [{ msg: 'Server Error' }],
		});
	}
});

// @route    POST api/groups/:groupId/file/students/
// @desc     add students to group from file
// @access   Private

router.post('/:groupId/file/students/', auth, async (req, res) => {
	try {
		const dbStudents = await Student.find({
			user: req.user.id,
			passport: { $in: req.body.map((item) => item.passport.trim()) },
		});

		let newStudents = req.body.filter(
			(item) => !dbStudents.map((item) => item.passport.trim()).includes(item.passport.trim())
		);

		newStudents = newStudents.map((item) => {
			return { ...item, user: req.user.id };
		});

		newStudents = await Student.insertMany(newStudents);

		let group = await Group.findOne({
			user: req.user.id,
			_id: req.params.groupId,
		});

		// Check for ObjectId format and group
		if (!req.params.groupId.match(/^[0-9a-fA-F]{24}$/) || !group) {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}

		const students = [
			...new Set([
				...group.students.map((item) => Types.ObjectId(item).toString()),
				...dbStudents.map((item) => Types.ObjectId(item._id).toString()),
				...newStudents.map((item) => Types.ObjectId(item._id).toString()),
			]),
		];

		group = await Group.findOneAndUpdate(
			{ user: req.user.id, _id: req.params.groupId },
			{
				$set: {
					students,
				},
			},
			{ new: true }
		).populate('students').populate('instructors');
		await group.save();

		res.json({ group, success: [{ msg: 'Group students udated succesful' }] });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}
		res.status(500).json({
			errors: [{ msg: 'Server Error' }],
		});
	}
});

// @route    POST api/groups/:groupId/file/instructors/
// @desc     add instructors to group from file
// @access   Private

router.post('/:groupId/file/instructors/', auth, async (req, res) => {
	try {
		const dbInstructors = await Instructor.find({
			user: req.user.id,
			healthBook: { $in: req.body.map((item) => item.healthBook) },
		});

		let newInstructors = req.body.filter(
			(item) => !dbInstructors.map((item) => item.healthBook).includes(item.healthBook)
		);

		newInstructors = newInstructors.map((item) => {
			return { ...item, user: req.user.id };
		});

		newInstructors = await Instructor.insertMany(newInstructors);

		let group = await Group.findOne({
			user: req.user.id,
			_id: req.params.groupId,
		});

		// Check for ObjectId format and group
		if (!req.params.groupId.match(/^[0-9a-fA-F]{24}$/) || !group) {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}

		const instructors = [
			...new Set([
				...group.instructors.map((item) => Types.ObjectId(item).toString()),
				...dbInstructors.map((item) => Types.ObjectId(item._id).toString()),
				...newInstructors.map((item) => Types.ObjectId(item._id).toString()),
			]),
		];

		group = await Group.findOneAndUpdate(
			{ user: req.user.id, _id: req.params.groupId },
			{
				$set: {
					instructors,
				},
			},
			{ new: true }
		).populate('instructors').populate('students');

		await group.save();

		res.json({ group, success: [{ msg: 'Group instructors udated succesful' }] });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'Group not found' }] });
		}
		res.status(500).json({
			errors: [{ msg: 'Server Error' }],
		});
	}
});
module.exports = router;
