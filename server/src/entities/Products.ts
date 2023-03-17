import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./admin/Cateogries";
import { Offers } from "./admin/Offers";
import { ProductCommission } from "./admin/SellerProductCommission";
import { SubCategory } from "./admin/SubCategories";
import { SubSubCategory } from "./admin/SubSubCategory";
import { OnCartProduct } from "./Cart/OnCartProduct";
import { Order } from "./Orders";
import { Question } from "./QuestionAndAnswer";
import { Review } from "./Review";
import { Seller } from "./seller/Seller";
import { WishlistProducts } from "./WishListToProduct";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  rating: number;

  @Column()
  price: number;

  @Column()
  brand: string;

  @Column()
  totalStock: number;

  @Column({ nullable: true })
  store: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  images: string;

  @Column()
  tags: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ nullable: true, default: 0 })
  discount: number;

  @Column({ nullable: true })
  priceAfterDiscount: number;

  @ManyToOne(() => Offers, (offer) => offer.products, {
    nullable: true,
    onDelete: "SET NULL",
  })
  offers: Offers;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  subCategory: SubCategory;

  @ManyToOne(() => SubSubCategory, (subsubCategory) => subsubCategory.products)
  subsubCategory: SubCategory;

  @Column({ nullable: true })
  sizes: string;
  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ default: 0 })
  timesBought: number;

  @OneToOne(() => ProductCommission, (commission) => commission)
  commission: ProductCommission;

  @OneToMany(
    () => WishlistProducts,
    (WishlistProducts) => WishlistProducts.product
  )
  wishlists: WishlistProducts[];

  @Column()
  sku: number;

  @OneToMany(() => Order, (order) => order.product)
  order: Order[];

  @OneToMany(() => Question, (question) => question.product)
  questions: Question[];

  @OneToMany(() => OnCartProduct, (onCart) => onCart.product)
  onCartProduct: OnCartProduct[];

  @ManyToOne(() => Seller, (seller) => seller.products, { nullable: true })
  seller: Seller;

  @Column({ default: false })
  isByAdmin: boolean;

  @OneToMany(() => Review, (review) => review.product)
  review: Review[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
