import React, { useEffect, useState } from 'react';

import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getCategoryById,
  addCategory,
  updateCategory,
} from '../../state/action/categoryActions';
import Loader from '../loader';
import { setSelectedCategory } from '../../state/reducer/categoryReducer';
import { setFailMessage } from '../../state/reducer/messageReducer';

const { Label, Control, Group } = Form;

const CategoryForm = ({ name }) => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [categoryname, setCategoryname] = useState('');

  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { selectedCategory, categoriesLoading, categoryAdding } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (categoryId) dispatch(getCategoryById(token, categoryId));
    else {
      setCategoryname('');
      dispatch(setSelectedCategory(null));
    }
    // eslint-disable-next-line
  }, [categoryId]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryname(selectedCategory.name);
    }
    // eslint-disable-next-line
  }, [selectedCategory]);

  const validateName = (name) => {
    const isOnlySpaces = name.trim().length;
    let status = {};
    if (!isOnlySpaces) {
      status.success = 0;
      status.message = 'Category should not containe only spaces';
    } else if (isOnlySpaces <= 1) {
      status.success = 0;
      status.message = 'Category length should be between 2 to 30';
    }

    if (status.message)
      dispatch(
        setFailMessage({
          message: status.message,
        })
      );

    return isOnlySpaces > 1;
  };

  const handleForm = (e) => {
    e.preventDefault();
    const isValid = validateName(categoryname);

    if (isValid && categoryId) {
      dispatch(
        updateCategory(token, {
          id: categoryId,
          name: categoryname.trim(),
        })
      );
    } else if (isValid && !categoryId) {
      dispatch(addCategory(token, { name: categoryname }));
    }
  };

  return (
    <>
      <Loader isLoading={categoriesLoading || categoryAdding} />
      <div className='container category'>
        <h3 className='text-center category-header'>{`${name} Category`}</h3>
        <Form>
          {categoryId && (
            <Group as={Row} controlId='categoryId'>
              <Label column sm={2}>
                Category Id
              </Label>
              <Col sm={10}>
                <Control
                  type='text'
                  placeholder='Category Id'
                  defaultValue={selectedCategory?.id}
                  disabled
                />
              </Col>
            </Group>
          )}

          <Group as={Row} controlId='categoryCategoryname'>
            <Label column sm={2}>
              Category
            </Label>
            <Col sm={10}>
              <Control
                type='text'
                placeholder='Enter Category'
                value={categoryname}
                onChange={(e) => {
                  setCategoryname(e.target.value);
                }}
              />
            </Col>
          </Group>

          <Row className='mt-5'>
            <Col md={{ span: 6, offset: 2 }} className='mb-2'>
              <Button
                onClick={handleForm}
                variant='success'
                type='submit'
                block
                disabled={
                  !categoryname ||
                  selectedCategory?.name.toLowerCase() ===
                    categoryname.toLowerCase()
                }
              >
                {`${name} Category`}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CategoryForm;
