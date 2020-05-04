/* eslint-disable react/jsx-key */
import React from 'react';
import styles from './tips.module.css';
import exImg from '../assets/pg-example.jpg';

export function getHanoiTips() {
  return [
    <p>
      1this is first pageUt ut ut. Molestiae enim exercitationem dignissimos
      est. Nesciunt at aut nihil consequatur amet. Perferendis porro totam
      facere quis facere et. Blanditiis repellendus hic necessitatibus. Aperiam
      maxime dignissimos voluptatem fuga. Culpa cupiditate error sint qui iusto
      optio autem. Sed non ipsa et tenetur quasi. Vitae tenetur voluptatem et.
      Rerum autem minima corporis expedita numquam atque vitae. Sit eos
      consectetur ab ipsa id. Sint nemo voluptatem temporibus quos sit. Nihil
      facere nam dolorem esse officia nihil praesentium voluptatum non. Eum
      alias quam commodi ex quos dignissimos officia. Quae accusamus ut quas
      officiis.
    </p>,
    <p>
      2this is second pageRerum est voluptatum impedit sint ut. Eligendi
      consequatur fugit expedita. Eveniet eos eaque nulla consequatur nihil.
      Cumque quidem nostrum aliquam consequuntur iure nihil repellat.
      Necessitatibus rerum voluptatem consequatur vel ratione accusantium
      soluta. Reiciendis quis iure minus. Reprehenderit quo ducimus aliquam
      rerum quo sequi molestiae aperiam. Est in et sed fuga consequatur qui
      tempora ipsa. Quis ut velit quibusdam similique. Dolorum ea beatae ipsam.
      Ea vel a fugiat minima iusto nihil. Quae vitae consequuntur sed mollitia
      sit temporibus necessitatibus repellat. Inventore quis et corrupti officia
      tempore et id. Molestiae quo et. Ratione odio nulla.
    </p>,
    <p>
      3this is first pageUt ut ut. Molestiae enim exercitationem dignissimos
      est. Nesciunt at aut nihil consequatur amet. Perferendis porro totam
      facere quis facere et. Blanditiis repellendus hic necessitatibus. Aperiam
      maxime dignissimos voluptatem fuga. Culpa cupiditate error sint qui iusto
      optio autem. Sed non ipsa et tenetur quasi. Vitae tenetur voluptatem et.
      Rerum autem minima corporis expedita numquam atque vitae. Sit eos
      consectetur ab ipsa id. Sint nemo voluptatem temporibus quos sit. Nihil
      facere nam dolorem esse officia nihil praesentium voluptatum non. Eum
      alias quam commodi ex quos dignissimos officia. Quae accusamus ut quas
      officiis.
    </p>,
    <p>
      4this is first pageUt ut ut. Molestiae enim exercitationem dignissimos
      est. Nesciunt at aut nihil consequatur amet. Perferendis porro totam
      facere quis facere et. Blanditiis repellendus hic necessitatibus. Aperiam
      maxime dignissimos voluptatem fuga. Culpa cupiditate error sint qui iusto
      optio autem. Sed non ipsa et tenetur quasi. Vitae tenetur voluptatem et.
      Rerum autem minima corporis expedita numquam atque vitae. Sit eos
      consectetur ab ipsa id. Sint nemo voluptatem temporibus quos sit. Nihil
      facere nam dolorem esse officia nihil praesentium voluptatum non. Eum
      alias quam commodi ex quos dignissimos officia. Quae accusamus ut quas
      officiis.
    </p>,
    <p>
      5this is first pageUt ut ut. Molestiae enim exercitationem dignissimos
      est. Nesciunt at aut nihil consequatur amet. Perferendis porro totam
      facere quis facere et. Blanditiis repellendus hic necessitatibus. Aperiam
      maxime dignissimos voluptatem fuga. Culpa cupiditate error sint qui iusto
      optio autem. Sed non ipsa et tenetur quasi. Vitae tenetur voluptatem et.
      Rerum autem minima corporis expedita numquam atque vitae. Sit eos
      consectetur ab ipsa id. Sint nemo voluptatem temporibus quos sit. Nihil
      facere nam dolorem esse officia nihil praesentium voluptatum non. Eum
      alias quam commodi ex quos dignissimos officia. Quae accusamus ut quas
      officiis.
    </p>,
  ];
}

export function getPGTips() {
  return [
    <div className={styles.pgOne}>
      <img src={exImg} className={styles.exImg} alt="tips-example" />
      <div className={styles.exDes}>
        <h3>输入并选取要分析的递归函数</h3>
        <ul>
          <li>在代码输入框中输入想要分析执行过程的代码</li>
          <li>代码可以包含多个函数过程，但至少包含一个递归函数</li>
          <li>不要忘记在代码中启动函数调用</li>
          <li>在上面的选择框中选择要进行分析的递归函数</li>
          <li>
            点击 <code>RUN</code> 来执行
          </li>
        </ul>
      </div>
    </div>,
    <div className={styles.pgTwo}>
      <h3>
        <span>⚠️</span>注意事项
      </h3>
      <div style={{ width: '100%' }}></div>
      <ul>
        <li>
          目前只支持 <code> JavaScript </code> 代码
        </li>
        <li>不要使用箭头函数</li>
        <li>不支持尾递归，以为着你的代码必须存在显式递归过程</li>
      </ul>
    </div>,
  ];
}
